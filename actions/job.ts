"use server";

import { auth } from "@/auth";
import { JobSchema } from "@/lib/schemas";
import { getUserByEmail } from "@/lib/user";
import prisma from "@/prisma/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createJob = async (values: z.infer<typeof JobSchema>) => {
  const session = await auth();

  if (!session || !session.user || !session.user.email) {
    return { success: false, message: "Not Authenticated" };
  }

  if (session.user.role !== "ADMIN") {
    return { success: false, message: "Not Authorized" };
  }

  const user = await getUserByEmail(session.user.email);

  if (!user) {
    return { success: false, message: "User not found" };
  }

  const validation = JobSchema.safeParse(values);

  if (!validation.success) {
    return { success: false, message: "Invalid Credentials" };
  }
  const {
    title,
    description,
    type,
    location,
    salaryRange,
    experience,
    companyName,
    companyLogo,
  } = validation.data;

  try {
    await prisma.job.create({
      data: {
        title,
        description,
        type,
        location,
        salaryRange,
        experience,
        companyName,
        companyLogo,
        userId: user.id,
      },
    });

    revalidatePath("/jobs");
    return { success: true, message: "Job created successfully" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Something went wrong" };
  }
};
