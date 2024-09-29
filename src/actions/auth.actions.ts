'use server';
import {
  EMAIL_VERIFICATION_LINK_RESENT_TIME,
  PASSWORD_HASH_SALT_ROUNDS,
  PENDING_EMAIL_VERIFICATION_USER_ID,
} from '@/config/auth.config';
import APP_PATHS from '@/config/path.config';
import prisma from '@/config/prisma.config';
import { withServerActionAsyncCatcher } from '@/lib/async-catch';
import { ErrorHandler } from '@/lib/error';
import {
  SignupSchema,
  SignupSchemaType,
} from '@/lib/validators/auth.validator';
import { ServerActionReturnType } from '@/types/api.types';
import bcryptjs from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { sendConfirmationEmail } from '@/lib/sendConfirmationEmail';
import { cookies } from 'next/headers';
import { SuccessResponse } from '@/lib/success';
import { isTokenExpiredUtil } from '@/lib/utils';
import { TokenType } from '@prisma/client';
export const signUp = withServerActionAsyncCatcher<
  SignupSchemaType,
  ServerActionReturnType
>(async (_data) => {
  const data = SignupSchema.parse(_data);

  const userExist = await prisma.user.findFirst({
    where: { email: data.email },
  });

  if (userExist)
    throw new ErrorHandler('User with this email already exist', 'BAD_REQUEST');

  const hashedPassword = await bcryptjs.hash(
    data.password,
    PASSWORD_HASH_SALT_ROUNDS
  );

  try {
    await prisma.$transaction(async (txn) => {
      const user = await txn.user.create({
        data: { ...data, password: hashedPassword },
      });

      const verificationToken = await txn.verificationToken.create({
        data: {
          identifier: user.id,
          token: uuidv4(),
          type: 'EMAIL_VERIFICATION',
        },
      });

      const confirmationLink = `${process.env.NEXTAUTH_URL}${APP_PATHS.VERIFY_EMAIL}/${verificationToken.token}`;
      await sendConfirmationEmail(
        data.email,
        confirmationLink,
        'EMAIL_VERIFICATION'
      );

      cookies().set(PENDING_EMAIL_VERIFICATION_USER_ID, user.id, {
        maxAge: 5 * 60, // 5 minutes
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      });

      return user;
    });

    return new SuccessResponse(
      'User registered successfully. A verification link has been sent to your email.',
      201
    ).serialize();
  } catch {
    throw new ErrorHandler(
      'Registration Failed, please try again!',
      'INTERNAL_SERVER_ERROR'
    );
  }
});

export const resendVerificationEmail = withServerActionAsyncCatcher<
  null,
  ServerActionReturnType
>(async () => {
  const unverifiedUserId = cookies().get(
    PENDING_EMAIL_VERIFICATION_USER_ID
  )?.value;

  if (!unverifiedUserId)
    throw new ErrorHandler('Resource not found!', 'BAD_REQUEST');

  const unverifiedUser = await prisma.user.findFirst({
    where: { id: unverifiedUserId, emailVerified: null },
  });

  if (!unverifiedUser)
    throw new ErrorHandler('Resource not found!', 'BAD_REQUEST');

  const verificationToken = await prisma.verificationToken.findFirst({
    where: { identifier: unverifiedUserId, type: 'EMAIL_VERIFICATION' },
  });

  if (!verificationToken)
    throw new ErrorHandler('Resource not found!', 'BAD_REQUEST');

  if (isTokenExpiredUtil(verificationToken.createdAt))
    throw new ErrorHandler('Link expired!', 'BAD_REQUEST', {
      linkExpired: true,
    });

  const now = new Date().getTime();

  // last time update i.e. token was updated
  const updatedAt = new Date(verificationToken.updatedAt).getTime();
  const isTooEarlyToResend =
    now - updatedAt < EMAIL_VERIFICATION_LINK_RESENT_TIME * 1000;
  if (isTooEarlyToResend)
    throw new ErrorHandler('Too much request', 'BAD_REQUEST');

  // TODO: should we not delete the user record from db
  await resendVerificationLinkUtil({
    userId: unverifiedUser.id,
    email: unverifiedUser.email,
    prevToken: verificationToken.token,
    type: 'EMAIL_VERIFICATION',
  });

  return new SuccessResponse(
    'Verfication link resent successfully!',
    201
  ).serialize();
});

const resendVerificationLinkUtil = async ({
  userId,
  email,
  prevToken,
  reIssue = false,
  type,
}: {
  userId: string;
  email: string;
  prevToken: string;
  reIssue?: boolean;
  type: TokenType;
}) => {
  const newToken = uuidv4();
  await prisma.verificationToken.update({
    where: {
      token_identifier: {
        identifier: userId,
        token: prevToken,
      },
      type,
    },
    data: { token: newToken, ...(reIssue ? { createdAt: new Date() } : {}) },
  });

  const confirmationLink = `${process.env.NEXTAUTH_URL}/${APP_PATHS.VERIFY_EMAIL}/${newToken}`;
  await sendConfirmationEmail(email, confirmationLink, type);
};

// It is serving two purpose/
// 1. Email verification
// 2. In case link got expired, by passing resend:true will be re-usable to re-issue the verfication link
export const verifyEmail = withServerActionAsyncCatcher<
  { token: string; resend?: boolean },
  ServerActionReturnType
>(async ({ token, resend = false }) => {
  let verificationToken = await prisma.verificationToken.findFirst({
    where: { token, type: 'EMAIL_VERIFICATION' },
  });

  if (!verificationToken)
    throw new ErrorHandler('Resource not found!', 'BAD_REQUEST', {
      notFound: true,
    });

  if (!isTokenExpiredUtil(verificationToken.createdAt)) {
    await prisma.$transaction(async (txn) => {
      await txn.user.update({
        where: { id: verificationToken.identifier },
        data: { emailVerified: new Date() },
      });

      await txn.verificationToken.delete({
        where: {
          token_identifier: {
            token: verificationToken.token,
            identifier: verificationToken.identifier,
          },
        },
      });

      return true;
    });
    cookies().delete(PENDING_EMAIL_VERIFICATION_USER_ID);
    return new SuccessResponse('Email verified successfully!', 201).serialize();
  }

  if (!resend) {
    throw new ErrorHandler('Link expired!', 'BAD_REQUEST', {
      linkExpired: true,
    });
  }

  const unverifiedUser = await prisma.user.findFirst({
    where: { id: verificationToken.identifier },
  });

  await resendVerificationLinkUtil({
    email: unverifiedUser!.email,
    prevToken: verificationToken.token,
    userId: unverifiedUser!.id,
    reIssue: true,
    type: 'EMAIL_VERIFICATION',
  });

  return new SuccessResponse(
    'Verfication link resent successfully!',
    201
  ).serialize();
});

export const forgetPassword = withServerActionAsyncCatcher<
  { email: string },
  ServerActionReturnType
>(async ({ email }) => {
  const user = await prisma.user.findFirst({ where: { email } });

  if (!user)
    throw new ErrorHandler(
      'No account associated with this email address.',
      'BAD_REQUEST'
    );

  const verificationToken = await prisma.verificationToken.create({
    data: {
      type: 'RESET_PASSWORD',
      token: uuidv4(),
      identifier: user.id,
    },
  });

  const resetPasswordLink = `${process.env.NEXTAUTH_URL}/${APP_PATHS.RESET_PASSWORD}/${verificationToken.token}`;

  await sendConfirmationEmail(email, resetPasswordLink, 'RESET_PASSWORD');

  return new SuccessResponse(
    'A password reset link has been sent to your email. Please check your inbox.',
    201
  ).serialize();
});

export const resetPassword = withServerActionAsyncCatcher<
  {
    token: string;
    password: string;
    confirmPassword: string;
  },
  ServerActionReturnType
>(async ({ token, password, confirmPassword }) => {
  if (password !== confirmPassword)
    throw new ErrorHandler('Password does not match.', 'BAD_REQUEST');

  const verificationToken = await prisma.verificationToken.findFirst({
    where: { token },
  });

  if (!verificationToken)
    throw new ErrorHandler('Invalid or expired reset link.', 'BAD_REQUEST');

  if (isTokenExpiredUtil(verificationToken.createdAt))
    throw new ErrorHandler(
      'The reset link has expired. Please request a new one.',
      'BAD_REQUEST'
    );

  const user = await prisma.user.findFirst({
    where: { id: verificationToken.identifier },
  });

  if (!user)
    throw new ErrorHandler(
      'Unauthorized access. User not found.',
      'AUTHENTICATION_FAILED'
    );

  await prisma.$transaction(async (txn) => {
    await txn.user.update({
      where: { id: verificationToken.identifier },
      data: {
        password: await bcryptjs.hash(password, PASSWORD_HASH_SALT_ROUNDS),
      },
    });

    await txn.verificationToken.delete({
      where: {
        token_identifier: {
          token: verificationToken.token,
          identifier: verificationToken.identifier,
        },
      },
    });
  });

  return new SuccessResponse(
    'Your password has been successfully updated.',
    201
  ).serialize();
});
