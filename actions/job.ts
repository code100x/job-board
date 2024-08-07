"use server";

import { auth } from "@/auth";
import { SAPayload } from "@/types";
import { NewJob, UpdateJob } from "@/zod/job";
import { prisma } from "@/lib/db";
import { Currency, Status } from "@prisma/client";
import { z } from "zod";

export const createJob = async (data: NewJob): Promise<SAPayload> => {
  const session = await auth();

  if (!session) {
    return { status: "error", message: "Internal Server Error" };
  }
  try {
    const newJob = await prisma.job.create({
      data: {
        userId: session.user.id as string,
        title: data.title,
        description: data.description,
        companyName: data.companyName,
        currency: data.currency as Currency,
        salary: data.salary,
        location: data.location,
        status: data.status as Status,
      },
    });
    return { status: "success", message: "Job created Successfully" };
  } catch (error) {
    console.log(error);
    return { status: "error", message: "Internal Server Error" };
  }
};

export const updateJob = async (data: UpdateJob): Promise<SAPayload> => {
  const session = await auth();

  if (!session) {
    return { status: "error", message: "Internal Server Error" };
  }

  try {
    const newJob = await prisma.job.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        description: data.description,
        companyName: data.companyName,
        currency: data.currency as Currency,
        salary: data.salary,
        location: data.location,
        status: data.status as Status,
      },
    });

    return { status: "success", message: "Job updated Successfully" };
  } catch (error) {
    console.log(error);
    return { status: "error", message: "Internal Server Error" };
  }
};

export const fetchActiveJobs = async () => {
  try {
    const response = await prisma.job.findMany({
      where: {
        status: "ACTIVE",
      },
    });
    return { status: "success", data: response };
  } catch (error) {
    console.error(error);
    return { status: "error", message: "Internal error" };
  }
};

export const fetchInActiveJobs = async () => {
  try {
    const response = await prisma.job.findMany({
      where: {
        status: "INACTIVE",
      },
    });
    return { status: "success", data: response };
  } catch (error) {
    console.error(error);
    return { status: "error", message: "Internal error" };
  }
};

export const updateStatus = async (data: UpdateJob): Promise<SAPayload> => {
  const session = await auth();

  if (!session) {
    return { status: "error", message: "Internal Server Error" };
  }

  try {
    const newJob = await prisma.job.update({
      where: {
        id: data.id,
      },
      data: {
        status: "ACTIVE",
      },
    });

    return { status: "success", message: "Published" };
  } catch (error) {
    console.log(error);
    return { status: "error", message: "Internal Server Error" };
  }
};

export const fetchJobDetails = async ({ id }: { id: string }) => {
  try {
    const response = await prisma.job.findUnique({
      where: {
        id: id,
      },
    });
    return { status: "success", data: response };
  } catch (error) {
    console.log(error);
    return { status: "error", message: "Internal error" };
  }
};

const GetJobSchema = z.object({
  title: z.string().optional().default(""),
  companyName: z
    .string()
    .min(5, {
      message: "Company Name must be at least 5 characters long.",
    })
    .optional(),
  location: z.string().optional().default(""),
  currency: z.enum(["INR", "USD"]).optional(),
  salRange: z.array(z.number()).optional().default([0, 1000000]),
});

type GetJobSchemaType = z.infer<typeof GetJobSchema>;

export const getJobs = async (data: GetJobSchemaType) => {
  const session = await auth();

  if (!session) {
    return { status: "error", message: "Internal Server Error" };
  }

  const { salRange, title, companyName, location, currency } = data;

  try {
    const jobs = await prisma.job.findMany({
      where: {
        ...(title && { title: { contains: title, mode: "insensitive" } }),
        ...(companyName && {
          companyName: { contains: companyName, mode: "insensitive" },
        }),
        ...(location && {
          location: { contains: location, mode: "insensitive" },
        }),
        ...(currency && { currency }),
      },
    });

    const filteredJobs = jobs.filter((job) => {
      const salary = parseFloat(job.salary);
      return !isNaN(salary) && salary >= salRange[0] && salary <= salRange[1];
    });

    return { status: "success", data: filteredJobs };
  } catch (error) {
    console.log(error);
    return { status: "error", message: "Internal Server Error" };
  }
};
// export const updateJob = async ({id}:string) =>{
//   const response = await prisma.job.update({})
// }
