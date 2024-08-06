"use server";

import { auth } from "@/auth";
import { SAPayload } from "@/types";
import { NewCustomJob } from "@/zod/job";
import { prisma } from "@/lib/db";
import { PaymentMethod } from "@prisma/client";

export const createCustomJob = async (data: NewCustomJob): Promise<SAPayload> => {
  const session = await auth();

  if (!session) {
    return { status: "error", message: "Internal Server Error" };
  }

  try {
    const newCustomJob = await prisma.customJob.create({
      data: {
        userId: session.user.id as string,
        name: data.name,
        description: data.description,
        companyName: data.companyName,
        payment_type: data.payment_type as PaymentMethod,
        location: data.location,
      },
    });

    return { status: "success", message: "Custom Job created Successfully" };
  } catch (error) {
    console.log(error);
    return { status: "error", message: "Internal Server Error" };
  }
};
