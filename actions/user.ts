"use server";
import { signIn, signOut } from "@/auth";
import { userLoginSchema } from "@/zod/user";
import { prisma } from "@/lib/db";
import { LoginAction, SAPayload } from "@/types";

export const loginUser = async (
  credentials: LoginAction
): Promise<SAPayload> => {
  const isValidated = await userLoginSchema.safeParseAsync(credentials);

  if (!isValidated.success) {
    return { status: "error", message: "Invalid Credentials" };
  }

  const { email, password } = isValidated.data;

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!existingUser) {
      return { status: "error", message: "User does not Exists" };
    }

    await signIn("credentials", { email, password, redirect: false });

    return { status: "success", message: "Login Successful" };
  } catch (error) {
    return { status: "error", message: "Internal Server Error" };
  }
};

export const logOutUser = async (): Promise<SAPayload> => {
  try {
    await signOut({ redirect: false });
    return { status: "success", message: "Logout Successful" };
  } catch (error) {
    return { status: "error", message: "Internal Server Error" };
  }
};
