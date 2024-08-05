"use server";

import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";
import { z } from "zod";
import { getPasswordResetTokenByToken } from "@/lib/password-reset-token";
import prisma from "@/prisma/db";
import bcrypt from "bcryptjs";
import { NewPasswordSchema, ResetSchema } from "@/lib/schemas";
import { getUserByEmail } from "@/lib/user";

export const resetPassword = async (values: z.infer<typeof ResetSchema>) => {
  const validation = ResetSchema.safeParse(values);
  if (!validation.success) {
    return { success: false, message: validation.error.message };
  }

  const { email } = validation.data;

  const existingUser = await getUserByEmail(email);
  if (!existingUser) {
    return { success: false, message: "User not found" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { success: true, message: "Password reset link sent" };
};

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token: string | null
) => {
  if (!token) {
    return { success: false, message: "Missing token" };
  }

  const validation = NewPasswordSchema.safeParse(values);

  if (!validation.success) {
    return { success: false, message: validation.error.message };
  }

  const { password } = validation.data;

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return { success: false, message: "Invalid token" };
  }

  const hasExpired = new Date(existingToken.expiresAt) < new Date();

  if (hasExpired) {
    return { success: false, message: "Token has expired" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { success: false, message: "Email not found" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });

  await prisma.passwordResetToken.delete({
    where: { id: existingToken.id },
  });

  return { success: true, message: "Password reset successful" };
};
