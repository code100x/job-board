import prisma from "@/prisma/db";

export async function getVerificationTokenByEmail(email: string) {
  try {
    const token = await prisma.verificationToken.findFirst({
      where: {
        email,
      },
    });

    return token;
  } catch (error) {
    return null;
  }
}

export async function getVerificationTokenByToken(token: string) {
  try {
    const verificationToken = await prisma.verificationToken.findFirst({
      where: {
        token,
      },
    });

    return verificationToken;
  } catch (error) {
    return null;
  }
}
