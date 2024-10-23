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
import { withAdminServerAction } from '@/lib/admin';
import { revalidatePath } from 'next/cache';

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
  const auth = await getServerSession(authOptions);
  if (!auth || !auth?.user?.id)
    throw new ErrorHandler('Not Authrised', 'UNAUTHORIZED');

  const result = JobPostSchema.parse(data);
  const {
    companyName,
    skills,
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
    hasExperiencerange,
    hasExpiryDate,
    expiryDate,
    maxSalary,
    minExperience,
    maxExperience,
    minSalary,
  } = result;
  await prisma.job.create({
    data: {
      userId: auth.user.id,
      title,
      description,
      hasExperiencerange,
      minExperience,
      expiryDate,
      hasExpiryDate,
      maxExperience,
      skills,
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

export const getAllJobs = withSession<
  JobQuerySchemaType,
  ServerActionReturnType<getAllJobsAdditonalType>
>(async (session, data) => {
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
  const isAdmin = session.user.role === 'ADMIN';
  const { filterQueries, orderBy, pagination } = getJobFilters(result);
  const queryJobsPromise = prisma.job.findMany({
    ...pagination,
    orderBy: [orderBy],
    where: {
      ...(isAdmin
        ? { ...filterQueries }
        : {
            isVerifiedJob: true,
            deleted: false,
            ...filterQueries,
            expired: false,
          }),
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
      hasExpiryDate: true,
      expiryDate: true,
      skills: true,
      address: true,
      workMode: true,
      category: true,
      minSalary: true,
      maxSalary: true,
      postedAt: true,
      companyLogo: true,
      isVerifiedJob: true,
      deleted: true,
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
      isVerifiedJob: true,
      expired: false,
      deleted: false,
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
      isVerifiedJob: true,
      companyLogo: true,
    },
  });

  if (jobs.length === 0) {
    const fallbackJobs = await prisma.job.findMany({
      where: {
        id: { not: id },
        expired: false,
        deleted: false,
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
        isVerifiedJob: true,
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
    where: { id, expired: false, deleted: false },
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
      expiryDate: true,
      hasExpiryDate: true,
      minExperience: true,
      maxExperience: true,
      skills: true,
      address: true,
      workMode: true,
      hasSalaryRange: true,
      minSalary: true,
      maxSalary: true,
      postedAt: true,
      isVerifiedJob: true,
      application: true,
    },
  });
  return new SuccessResponse(`${id} Job fetched successfully`, 200, {
    job,
  }).serialize();
});

export const getCityFilters = async () => {
  const response = await prisma.job.findMany({
    where: {
      isVerifiedJob: true,
      expired: false,
      deleted: false,
    },
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
      where: {
        isVerifiedJob: true,
        deleted: false,
        expired: false,
      },
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
        application: true,
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

export const toggleDeleteJobById = withServerActionAsyncCatcher<
  DeleteJobByIdSchemaType,
  ServerActionReturnType<deletedJob>
>(async (data) => {
  const result = deleteJobByIdSchema.parse(data);
  const { id } = result;

  // Fetch the current job's deleted status
  const job = await prisma.job.findUnique({
    where: {
      id: id,
    },
    select: {
      deleted: true,
      deletedAt: true,
    },
  });

  if (!job) {
    throw new Error('Job not found');
  }

  const isNowDeleted = !job.deleted;
  const deletedAt = isNowDeleted ? new Date() : null;

  const updatedJob = await prisma.job.update({
    where: {
      id: id,
    },
    data: {
      deleted: isNowDeleted,
      deletedAt: deletedAt,
    },
  });

  const action = updatedJob.deleted ? 'Deleted' : 'Undeleted';
  const deletedJobID = updatedJob.id;

  revalidatePath('/manage');

  return new SuccessResponse(`Job ${action} successfully`, 200, {
    deletedJobID,
  }).serialize();
});

export const toggleApproveJob = withAdminServerAction<
  ApproveJobSchemaType,
  ServerActionReturnType<ApprovedJobID>
>(async (session, data) => {
  const result = ApproveJobSchema.safeParse(data);
  if (!result.success) {
    throw new Error(result.error.errors.toLocaleString());
  }

  const { id } = result.data;

  const job = await prisma.job.findUnique({
    where: { id: id },
    select: { isVerifiedJob: true },
  });

  if (!job) {
    throw new Error('Job not found');
  }

  await prisma.job.update({
    where: {
      id: id,
    },
    data: {
      isVerifiedJob: !job.isVerifiedJob,
    },
  });

  revalidatePath('/manage');
  const message = job.isVerifiedJob ? 'Job Unapproved' : 'Job Approved';
  return new SuccessResponse(message, 200, { jobId: id }).serialize();
});

export async function updateExpiredJobs() {
  const currentDate = new Date();

  await prisma.job.updateMany({
    where: {
      hasExpiryDate: true,
      expiryDate: {
        lt: currentDate,
      },
    },
    data: {
      expired: true,
    },
  });
}
export const deleteOldDeltedJobs = async () => {
  const twoWeeksAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);

  await prisma.job.deleteMany({
    where: {
      deleted: true,
      deletedAt: {
        lte: twoWeeksAgo,
      },
    },
  });
};

export async function toggleBookmarkAction(userId: string, jobId: string) {
  try {
    if (!userId || !jobId) throw new Error('User or Post is missing');

    const checkForUser = await prisma.user.findFirst({
      where: { id: userId },
    });

    if (!checkForUser)
      throw new ErrorHandler(
        'User with this email does not exist',
        'BAD_REQUEST'
      );

    const checkForBookmark = await prisma.bookmark.findFirst({
      where: {
        jobId: jobId,
        userId: userId,
      },
    });

    if (checkForBookmark) {
      const deletedBookmark = await prisma.bookmark.delete({
        where: {
          id: checkForBookmark.id,
        },
      });

      return {
        status: 201,
        message: 'Bookmark Deleted Successfully',
        data: deletedBookmark,
      };
    }

    const createNewBookmark = await prisma.bookmark.create({
      data: {
        jobId: jobId,
        userId: userId,
      },
    });

    return {
      status: 200,
      message: 'Bookmarked Successfully',
      data: createNewBookmark,
    };
  } catch (error) {
    return {
      status: 404,
      message: (error as Error).message,
      data: null,
    };
  }
}

export async function GetBookmarkByUserId() {
  try {
    const auth = await getServerSession(authOptions);

    if (!auth || !auth?.user?.id)
      throw new ErrorHandler('Not Authrised', 'UNAUTHORIZED');

    const userId = auth.user.id;

    const getUserBookmarks = await prisma.bookmark.findMany({
      where: {
        userId: userId,
      },

      select: {
        job: {
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
            hasExpiryDate: true,
            expiryDate: true,
            skills: true,
            address: true,
            workMode: true,
            category: true,
            minSalary: true,
            maxSalary: true,
            postedAt: true,
            companyLogo: true,
          },
        },
      },
    });

    if (!getUserBookmarks || getUserBookmarks.length === 0)
      throw new Error('No Bookmarked Job found');

    return {
      status: 200,
      message: 'Bookmarks fetched ',
      data: getUserBookmarks,
    };
  } catch (error) {
    return {
      status: 404,
      message: (error as Error).message,
      data: null,
    };
  }
}

export async function GetUserBookmarksId() {
  try {
    const auth = await getServerSession(authOptions);

    if (!auth || !auth?.user?.id)
      throw new ErrorHandler('Not Authrised', 'UNAUTHORIZED');

    const userId = auth.user.id;

    const getUserBookmarks = await prisma.user.findFirst({
      where: {
        id: userId,
      },

      select: {
        bookmark: {
          select: {
            jobId: true,
          },
        },
      },
    });

    if (!getUserBookmarks) throw new Error('No Bookmarked Job found');

    return {
      status: 200,
      message: 'Bookmarks fetched ',
      data: getUserBookmarks.bookmark,
    };
  } catch (error) {
    return {
      status: 404,
      message: (error as Error).message,
      data: null,
    };
  }
}
