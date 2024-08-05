"use server";

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/route";
import { LoginSchema, RegisterSchema } from "@/lib/schemas";
import { getUserByEmail } from "@/lib/user";
import { AuthError } from "next-auth";
import { z } from "zod";
import bcrypt from "bcryptjs";
import prisma from "@/prisma/db";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const loginUser = async (values: z.infer<typeof LoginSchema>) => {
  const validation = LoginSchema.safeParse(values);

  if (!validation.success) {
    return { success: false, message: "Invalid Credentials" };
  }
  const { email, password } = validation.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { success: false, message: "User does not exist" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: true, message: "Confirmation email sent" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    console.error("Caught error:", error);
    if (error instanceof AuthError) {
      console.error("AuthError type:", error.type);
      switch (error.type) {
        case "CallbackRouteError":
          return { success: false, message: "Invalid Credentials" };
        case "CredentialsSignin":
          return { success: false, message: "Invalid Credentials" };
        default:
          return { success: false, message: "Something went wrong" };
      }
    }

    throw error;
  }
};

export const registerUser = async (values: z.infer<typeof RegisterSchema>) => {
  const validation = RegisterSchema.safeParse(values);

  if (!validation.success) {
    return { success: false, message: "Invalid Credentials" };
  }
  const { name, email, password } = validation.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { success: false, message: "User already exists" };
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: true, message: "Confirmation email sent" };
};
