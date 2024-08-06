"use server";

import { auth } from "@/auth";
import { SAPayload } from "@/types";
import { NewJob } from "@/zod/job";
import { prisma } from "@/lib/db";
import { Currency, State } from "@prisma/client";

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
        state: data.state as State,
      },
    });

    return { status: "success", message: "Job created Successfully" };
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
