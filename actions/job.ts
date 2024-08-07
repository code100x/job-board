"use server";

import { auth } from "@/auth";
import { SAPayload } from "@/types";
import { NewJob } from "@/zod/job";
import { prisma } from "@/lib/db";
<<<<<<< HEAD
import { Currency } from "@prisma/client";
import { notFound } from "next/navigation";
=======
import { Currency, Job } from "@prisma/client";
import z from "zod";
>>>>>>> 580e17e4ee12f0d085779f505e3d8859362de874

export const createJob = async (data: NewJob): Promise<SAPayload> => {
  const session = await auth();

  if (!session) {
    return { status: "error", message: "Internal Server Error" };
  }

  try {
    const newJob = await prisma.job.create({
      data: {
        title: data.title,
        description: data.description,
        companyName: data.companyName,
        currency: data.currency as Currency,
        salary: data.salary,
        location: data.location,
        type: "",
      },
    });

    return { status: "success", message: "Job created Successfully" };
  } catch (error) {
    console.log(error);
    return { status: "error", message: "Internal Server Error" };
  }
};
<<<<<<< HEAD
export const getJob = async (id: string) => {
=======

const GetJobSchema = z.object({
  title: z.string().optional().default(""),
  companyName: z.string().min(5, {
    message: "Company Name must be at least 5 characters long.",
  }).optional(),
  location: z.string().optional().default(""),
  currency: z.enum(["INR", "USD"]).optional(),
  salRange: z.array(z.number()).optional().default([0, 1000000]),
});

type GetJobSchemaType = z.infer<typeof GetJobSchema>;

export const getJobs = async (data: GetJobSchemaType) => {
>>>>>>> 580e17e4ee12f0d085779f505e3d8859362de874
  const session = await auth();

  if (!session) {
    return { status: "error", message: "Internal Server Error" };
  }

<<<<<<< HEAD
  try {
    const job = await prisma.job.findFirst({
      where: {
        id: id,
      },
    });

    if (!job) {
      return notFound();
    }

    return job
  } catch (error) {
    console.log(error);
    // return { status: "error", message: "Internal Server Error" };
=======
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

    const filteredJobs = jobs.filter((job) => {
      const salary = parseFloat(job.salary);
      return !isNaN(salary) && salary >= salRange[0] && salary <= salRange[1];
    });

    return { status: "success", data: filteredJobs };
  } catch (error) {
    console.log(error);
    return { status: "error", message: "Internal Server Error" };
>>>>>>> 580e17e4ee12f0d085779f505e3d8859362de874
  }
};
