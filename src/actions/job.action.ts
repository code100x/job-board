'use server';
import prisma from '@/config/prisma.config';
import { withServerActionAsyncCatcher } from '@/lib/async-catch';
import { ErrorHandler } from '@/lib/error';
import { SuccessResponse } from '@/lib/success';
import {
  JobByIdSchema,
  JobByIdSchemaType,
  JobPostSchema,
  JobPostSchemaType,
  JobQuerySchema,
  JobQuerySchemaType,
  RecommendedJobSchema,
  RecommendedJobSchemaType,
} from '@/lib/validators/jobs.validator';
import { getJobFilters } from '@/services/jobs.services';
import { ServerActionReturnType } from '@/types/api.types';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

import {
  getAllJobsAdditonalType,
  getAllRecommendedJobs,
  getJobType,
} from '@/types/jobs.types';

type additional = {
  isVerifiedJob: boolean;
};
export const createJob = withServerActionAsyncCatcher<
  JobPostSchemaType,
  ServerActionReturnType<additional>
>(async (data) => {
  const auth = await getServerSession(authOptions);
  if (!auth || !auth?.user?.id)
    throw new ErrorHandler('Not Authrised', 'UNAUTHORIZED');

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
      userId: auth.user.id,
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
      isVerifiedJob: false,
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
  if (data?.EmpType && !Array.isArray(data?.EmpType)) {
    data.EmpType = Array.of(data?.EmpType);
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
      type: true,
      title: true,
      description: true,
      companyName: true,
      city: true,
      companyBio: true,
      hasExperiencerange: true,
      minExperience: true,
      maxExperience: true,
      skills: true,
      address: true,
      workMode: true,
      category: true,
      minSalary: true,
      maxSalary: true,
      postedAt: true,
      companyLogo: true,
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

export const getRecommendedJobs = withServerActionAsyncCatcher<
  RecommendedJobSchemaType,
  ServerActionReturnType<getAllRecommendedJobs>
>(async (data) => {
  const result = RecommendedJobSchema.parse(data);
  const { id, category } = result;

  // fettching the latest three jobs excluding the current job and in the same category
  const jobs = await prisma.job.findMany({
    where: {
      category: category,
      id: { not: id },
    },
    orderBy: {
      postedAt: 'desc',
    },
    take: 3,
    select: {
      id: true,
      type: true,
      title: true,
      description: true,
      companyName: true,
      companyBio: true,
      city: true,
      address: true,
      category: true,
      workMode: true,
      minSalary: true,
      minExperience: true,
      maxExperience: true,
      maxSalary: true,
      postedAt: true,
      skills: true,
      companyLogo: true,
    },
  });

  if (jobs.length === 0) {
    const fallbackJobs = await prisma.job.findMany({
      where: {
        id: { not: id },
      },
      orderBy: {
        postedAt: 'desc',
      },
      take: 3, // Fallback to showing latest 3 jobs from other categories
      select: {
        id: true,
        type: true,
        title: true,
        description: true,
        companyName: true,
        companyBio: true,
        city: true,
        address: true,
        workMode: true,
        minSalary: true,
        skills: true,
        maxSalary: true,
        postedAt: true,
        companyLogo: true,
        minExperience: true,
        maxExperience: true,
        category: true,
      },
    });

    return new SuccessResponse(
      'No jobs found in this category, here are some recent jobs',
      200,
      { jobs: fallbackJobs }
    ).serialize();
  }

  return new SuccessResponse('Recommended jobs fetched successfully', 200, {
    jobs,
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
      type: true,
      companyLogo: true,
      category: true,
      city: true,
      hasExperiencerange: true,
      minExperience: true,
      maxExperience: true,
      skills: true,
      address: true,
      workMode: true,
      hasSalaryRange: true,
      minSalary: true,
      maxSalary: true,
      postedAt: true,
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
        companyBio: true,
        companyName: true,
        city: true,
        address: true,
        workMode: true,
        minSalary: true,
        maxSalary: true,
        category: true,
        minExperience: true,
        maxExperience: true,
        skills: true,
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

export const updateJob = withServerActionAsyncCatcher<
  JobPostSchemaType & { jobId: string },
  ServerActionReturnType<additional>
>(async (data) => {
  const auth = await getServerSession(authOptions);
  if (!auth || !auth?.user?.id)
    throw new ErrorHandler('Not Authorized', 'UNAUTHORIZED');

  const { jobId, ...updateData } = data;
  const parsedId = JobByIdSchema.parse({ id: jobId });

  const result = JobPostSchema.parse(updateData);

  let job = await prisma.job.findFirst({
    where: { id: parsedId.id, userId: auth.user.id },
  });

  if (!job)
    throw new ErrorHandler('Job not found or not authorized', 'NOT_FOUND');

  // Update the job
  job = await prisma.job.update({
    where: { id: parsedId.id },
    data: { ...result, isVerifiedJob: false },
  });

  const additonal = { isVerifiedJob: false, jobId: job.id };

  return new SuccessResponse(
    'Job updated successfully',
    200,
    additonal
  ).serialize();
});
