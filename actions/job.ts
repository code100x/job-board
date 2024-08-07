"use server";

import { auth } from "@/auth";
import { SAPayload } from "@/types";
import { NewJob } from "@/zod/job";
import { prisma } from "@/lib/db";
import { Currency, Job } from "@prisma/client";
import z from "zod";

// Define the structure of the response payload
type ResponsePayload = {
  status: "success" | "error";
  message?: string;
  data?: Job[];
};

// Improved function to create a new job
export const createJob = async (data: NewJob): Promise<ResponsePayload> => {
  const session = await auth();

  if (!session) {
    return { status: "error", message: "Authentication required" };
  }

  try {
    await prisma.job.create({
      data: {
        userId: session.user.id as string,
        title: data.title,
        description: data.description,
        companyName: data.companyName,
        currency: data.currency as Currency,
        salary: data.salary,
        location: data.location,
      },
    });

    return { status: "success", message: "Job created successfully" };
  } catch (error) {
    console.error("Error creating job:", error);
    return { status: "error", message: "Failed to create job" };
  }
};

const GetJobSchema = z.object({
  title: z.string().optional().default(""),
  companyName: z.string().min(5, {
    message: "Company Name must be at least 5 characters long.",
  }).optional(),
  location: z.string().optional().default(""),
  currency: z.enum(["INR", "USD"]).optional(),
  salRange: z.array(z.number()).length(2).default([0, 1000000]),
});

type GetJobSchemaType = z.infer<typeof GetJobSchema>;

// Improved function to get jobs with error handling
export const getJobs = async (data: GetJobSchemaType): Promise<ResponsePayload> => {
  const session = await auth();

  if (!session) {
    return { status: "error", message: "Authentication required" };
  }

  const { salRange, title, companyName, location, currency } = data;

  try {
    const jobs = await prisma.job.findMany({
      where: {
        ...(title && { title: { contains: title, mode: "insensitive" } }),
        ...(companyName && { companyName: { contains: companyName, mode: "insensitive" } }),
        ...(location && { location: { contains: location, mode: "insensitive" } }),
        ...(currency && { currency }),
      },
    });

    // Ensure salRange is always an array of two numbers
    if (!Array.isArray(salRange) || salRange.length !== 2) {
      return { status: "error", message: "Invalid salary range format" };
    }
    
    const filteredJobs = jobs.filter((job) => {
      const salary = parseFloat(job.salary);
      return !isNaN(salary) && salary >= salRange[0] && salary <= salRange[1];
    });

    return { status: "success", data: filteredJobs };
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return { status: "error", message: "Failed to retrieve jobs" };
  }
};
