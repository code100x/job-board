"use server";

import { auth } from "@/auth";
import { SAPayload } from "@/types";
import { NewJob } from "@/zod/user";
import { prisma } from "@/lib/db";
import { Currency } from "@prisma/client";

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
      },
    });

    return { status: "success", message: "Job created Successfully" };
  } catch (error) {
    console.log(error);
    return { status: "error", message: "Internal Server Error" };
  }
};
