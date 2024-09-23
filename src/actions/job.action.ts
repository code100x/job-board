'use server';
import prisma from '@/config/prisma.config';
import { withServerActionAsyncCatcher } from '@/lib/async-catch';
import { withSession } from '@/lib/session';
import { ErrorHandler } from '@/lib/error';
import { SuccessResponse } from '@/lib/success';
import {
  ApproveJobSchema,
  ApproveJobSchemaType,
  deleteJobByIdSchema,
  DeleteJobByIdSchemaType,
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

type additional = {
  isVerifiedJob: boolean;
};

type deletedJob = {
  deletedJobID: string;
}; //TODO: Convert it to generic type that returns JobID Only;

type ApprovedJobID = {
  jobId: string;
};

export const createJob = withSession<
  JobPostSchemaType,
  ServerActionReturnType<additional>
>(async (data) => {
  const result = JobPostSchema.parse(data);
  const {
    companyName,
    companyBio,
    companyEmail,
    type,
    category,
    application,
    city,
    address,
    companyLogo,
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
      companyBio,
      companyEmail,
      type,
      category,
      application,
      hasSalaryRange,
      minSalary,
      maxSalary,
      city,
      address,
      companyLogo,
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
  if (data?.city && !Array.isArray(data?.city)) {
    data.city = Array.of(data?.city);
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
      city: true,
      address: true,
      workMode: true,
      minSalary: true,
      maxSalary: true,
      postedAt: true,
      companyLogo: true,
      isVerifiedJob: true,
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
      companyBio: true,
      companyEmail: true,
      companyLogo: true,
      city: true,
      address: true,
      workMode: true,
      minSalary: true,
      maxSalary: true,
      postedAt: true,
      isVerifiedJob: true,
    },
  });
  return new SuccessResponse(`${id} Job fetched successfully`, 200, {
    job,
  }).serialize();
});

export const getCityFilters = async () => {
  const response = await prisma.job.findMany({
    select: {
      city: true,
    },
  });
  const cities = Array.from(new Set(response.map((res) => res.city)));
  return new SuccessResponse(`Cities fetched successfully`, 200, {
    cities,
  }).serialize();
};

export const getRecentJobs = async () => {
  try {
    const recentJobs = await prisma.job.findMany({
      orderBy: {
        postedAt: 'desc',
      },
      select: {
        id: true,
        title: true,
        description: true,
        companyName: true,
        city: true,
        address: true,
        workMode: true,
        minSalary: true,
        maxSalary: true,
        postedAt: true,
        companyLogo: true,
        type: true,
      },
      take: 6,
    });
    return new SuccessResponse('Recently added jobs fetch successfully', 200, {
      recentJobs,
    }).serialize();
  } catch (_error) {
    return new ErrorHandler('Internal server error', 'DATABASE_ERROR');
  }
};

export const deleteJobById = withServerActionAsyncCatcher<
  DeleteJobByIdSchemaType,
  ServerActionReturnType<deletedJob>
>(async (data) => {
  const result = deleteJobByIdSchema.parse(data);
  const { id } = result;
  const deletedJob = await prisma.job.delete({
    where: {
      id: id,
    },
  });
  const deletedJobID = deletedJob.id;
  return new SuccessResponse('Job Deleted successfully', 200, {
    deletedJobID,
  }).serialize();
});

export const approveJob = withSession<
  ApproveJobSchemaType,
  ServerActionReturnType<ApprovedJobID>
>(async (session, data) => {
  if (session.user.role === 'USER') {
    throw new Error('Unauth Access');
  }
  const result = ApproveJobSchema.parse(data);
  const { id } = result;
  await prisma.job.update({
    where: {
      id: id,
    },
    data: {
      isVerifiedJob: true,
    },
  });
  return new SuccessResponse('Job Approved', 200, { jobId: id }).serialize();
});

export const getAllJobsForAdmin = withSession<
  //not the ideal action we should make getAllJobs() better so we can option to display verified and unverified jobs by Inputs
  JobQuerySchemaType,
  ServerActionReturnType<getAllJobsAdditonalType>
>(async (session, data) => {
  if (session.user.role === 'USER') {
    throw new Error('UnAuth Access');
  }
  if (data?.workmode && !Array.isArray(data?.workmode)) {
    data.workmode = Array.of(data?.workmode);
  }
  if (data?.salaryrange && !Array.isArray(data?.salaryrange)) {
    data.salaryrange = Array.of(data?.salaryrange);
  }
  if (data?.city && !Array.isArray(data?.city)) {
    data.city = Array.of(data?.city);
  }
  const result = JobQuerySchema.parse(data);
  const { filterQueries, orderBy, pagination } = getJobFilters(result);
  const queryJobsPromise = prisma.job.findMany({
    ...pagination,
    orderBy: [orderBy],
    where: {
      ...filterQueries,
    },
    select: {
      id: true,
      title: true,
      description: true,
      companyName: true,
      city: true,
      address: true,
      workMode: true,
      minSalary: true,
      maxSalary: true,
      postedAt: true,
      companyLogo: true,
      isVerifiedJob: true,
    },
  });
  const totalJobsPromise = prisma.job.count({
    where: {
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
