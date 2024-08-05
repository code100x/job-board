import prisma from "@/prisma/db";

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordToken = await prisma.passwordResetToken.findUnique({
      where: {
        token,
      },
    });

    return passwordToken;
  } catch (error) {
    return null;
  }
};

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordToken = await prisma.passwordResetToken.findFirst({
      where: {
        email,
      },
    });

    return passwordToken;
  } catch (error) {
    return null;
  }
};
