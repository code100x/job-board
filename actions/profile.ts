"use server";
import { prisma } from "@/lib/db";
import { SAPayload } from "@/types";

export const getProfile = async (userId: string): Promise<SAPayload> => {
  try {
    // Fetch user profile from the database
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        email: true,
        name: true,
        image: true,
        role: true,
      },
    });

    if (!user) {
      return { status: "error", message: "User not found" };
    }

    return { status: "success", data: user };
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return { status: "error", message: "Internal Server Error" };
  }
};
