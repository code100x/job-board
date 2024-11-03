'use server';

import prisma from '@/config/prisma.config';
import { ErrorHandler } from '@/lib/error';
import { withSession } from '@/lib/session';
import { SuccessResponse } from '@/lib/success';
import { HRPostSchema, HRPostSchemaType } from '@/lib/validators/hr.validator';
import { ServerActionReturnType } from '@/types/api.types';
import bcryptjs from 'bcryptjs';
import { PASSWORD_HASH_SALT_ROUNDS } from '@/config/auth.config';
import { generateRandomPassword } from '@/lib/randomPassword';

type HRReturnType = {
  password: string;
  userId: string;
};

export const createHR = withSession<
  HRPostSchemaType,
  ServerActionReturnType<HRReturnType>
>(async (session, data) => {
  if (!session || !session?.user?.id || session.user.role !== 'ADMIN') {
    throw new ErrorHandler('Not Authrised', 'UNAUTHORIZED');
  }

  const result = HRPostSchema.safeParse(data);
  if (result.error) {
    throw new ErrorHandler('Invalid Data', 'BAD_REQUEST');
  }

  const { companyBio, companyLogo, companyName, email, name } = result.data;

  const userExist = await prisma.user.findFirst({
    where: { email: email },
  });

  if (userExist)
    throw new ErrorHandler('User with this email already exist', 'BAD_REQUEST');
  const password = generateRandomPassword();
  const hashedPassword = await bcryptjs.hash(
    password,
    PASSWORD_HASH_SALT_ROUNDS
  );
  const { user } = await prisma.$transaction(async () => {
    const company = await prisma.company.create({
      data: {
        companyName: companyName,
        companyBio: companyBio,
        companyLogo: companyLogo,
        companyEmail: email,
      },
    });

    const user = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
        name: name,
        role: 'HR',
        companyId: company.id,
        emailVerified: new Date(),
      },
    });

    return { user };
  });

  const returnObj = {
    password,
    userId: user.id,
  };

  return new SuccessResponse(
    'HR created successfully.',
    201,
    returnObj
  ).serialize();
});
