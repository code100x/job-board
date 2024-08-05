import prisma from "@/prisma/db";
import { v4 as uuidv4 } from "uuid";
import { getPasswordResetTokenByEmail } from "./password-reset-token";
import { getVerificationTokenByEmail } from "./verification-token";

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await prisma.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const passwordResetToken = await prisma.passwordResetToken.create({
    data: {
      token,
      expiresAt: expires,
      email,
    },
  });

  return passwordResetToken;
};

export async function generateVerificationToken(email: string) {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await prisma.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verificationToken = await prisma.verificationToken.create({
    data: {
      token,
      expiresAt: expires,
      email,
    },
  });

  return verificationToken;
}
