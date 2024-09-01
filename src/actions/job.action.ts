'use server';
import prisma from '@/config/prisma.config';
import { withServerActionAsyncCatcher } from '@/lib/async-catch';
import { SuccessResponse } from '@/lib/success';
import {
  JobByIdSchema,
  JobByIdSchemaType,
  JobPostSchema,
  JobPostSchemaType,
  JobQuerySchema,
  JobQuerySchemaType,
} from '@/lib/validators/jobs.validator';
import { getJobFilters } from '@/services/jobs.services';
import { ServerActionReturnType } from '@/types/api.types';
import { getAllJobsAdditonalType, getJobType } from '@/types/jobs.types';
import { redirect } from 'next/navigation';

type additional = {
  isVerifiedJob: boolean;
};
export const createJob = withServerActionAsyncCatcher<
  JobPostSchemaType,
  ServerActionReturnType<additional>
>(async (data) => {
  const result = JobPostSchema.parse(data);
  const {
    companyName,
    location,
    title,
    workMode,
    description,
    hasSalaryRange,
    maxSalary,
    minSalary,
  } = result;
  await prisma.job.create({
    data: {
      userId: '1', // Default to 1 since there's no session to check for user id
      title,
      description,
      companyName,
      hasSalaryRange,
      minSalary,
      maxSalary,
      location,
      workMode,
      isVerifiedJob: false, // Default to false since there's no session to check for admin role
    },
  });
  const message = 'Job created successfully, waiting for admin approval';
  const additonal = { isVerifiedJob: false };
  return new SuccessResponse(message, 201, additonal).serialize();
});

export const getAllJobs = withServerActionAsyncCatcher<
  JobQuerySchemaType,
  ServerActionReturnType<getAllJobsAdditonalType>
>(async (data) => {
  if (data?.workmode && !Array.isArray(data?.workmode)) {
    data.workmode = Array.of(data?.workmode);
  }
  if (data?.salaryrange && !Array.isArray(data?.salaryrange)) {
    data.salaryrange = Array.of(data?.salaryrange);
  }
  if (data?.location && !Array.isArray(data?.location)) {
    data.location = Array.of(data?.location);
  }
  const result = JobQuerySchema.parse(data);
  const { filterQueries, orderBy, pagination } = getJobFilters(result);
  const queryJobsPromise = prisma.job.findMany({
    ...pagination,
    orderBy: [orderBy],
    where: {
      isVerifiedJob: true,
      ...filterQueries,
    },
    select: {
      id: true,
      title: true,
      description: true,
      companyName: true,
      location: true,
      workMode: true,
      minSalary: true,
      maxSalary: true,
      postedAt: true,
    },
  });
  const totalJobsPromise = prisma.job.count({
    where: {
      isVerifiedJob: true,
      ...filterQueries,
    },
  });

  const [jobs, totalJobs] = await Promise.all([
    queryJobsPromise,
    totalJobsPromise,
  ]);
  return new SuccessResponse('All jobs fetched successfully', 200, {
    jobs,
    totalJobs,
  }).serialize();
});

export const getJobById = withServerActionAsyncCatcher<
  JobByIdSchemaType,
  ServerActionReturnType<getJobType>
>(async (data) => {
  const result = JobByIdSchema.parse(data);
  const { id } = result;
  const job = await prisma.job.findFirst({
    where: { id },
    select: {
      id: true,
      title: true,
      description: true,
      companyName: true,
      location: true,
      workMode: true,
      minSalary: true,
      maxSalary: true,
      postedAt: true,
    },
  });
  return new SuccessResponse(`${id} Job fetched successfully`, 200, {
    job,
  }).serialize();
});

export const jobFilterQuery = async (
  queries: JobQuerySchemaType,
  baseUrl: string
) => {
  const { page, sortby, location, salaryrange, search, workmode } =
    JobQuerySchema.parse(queries);
  const searchParams = new URLSearchParams({
    page: page.toString(),
    sortby,
    ...(search && { search: search.trim() }),
  });
  location?.map((location) => searchParams.append('location', location));
  salaryrange?.map((range) => searchParams.append('salaryrange', range));
  workmode?.map((mode) => searchParams.append('workmode', mode));
  redirect(`${baseUrl}?${searchParams.toString()}`);
};
