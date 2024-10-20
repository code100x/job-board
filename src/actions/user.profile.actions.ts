'use server';
import prisma from '@/config/prisma.config';
import {
  addSkillsSchemaType,
  expFormSchemaType,
  projectSchemaType,
  UserProfileSchemaType,
} from '@/lib/validators/user.profile.validator';
import bcryptjs from 'bcryptjs';
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import { ErrorHandler } from '@/lib/error';
import { withServerActionAsyncCatcher } from '@/lib/async-catch';
import { ServerActionReturnType } from '@/types/api.types';
import { SuccessResponse } from '@/lib/success';

export const updateUser = async (
  email: string,
  data: UserProfileSchemaType
) => {
  try {
    const existingUser = await prisma.user.findFirst({
      where: { email: email },
    });
    if (!existingUser) return { error: 'User not found!' };

    // TO-DO verifyEmail

    await prisma.user.update({
      where: { id: existingUser.id },
      data: {
        name: data.name,
        email: data.email,
      },
    });
    return { success: 'Your profile has been successfully updated.' };
  } catch (error) {
    return { error: error };
  }
};

export const changePassword = async (
  email: string,
  data: {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  }
) => {
  try {
    const existingUser = await prisma.user.findFirst({
      where: { email: email },
    });
    const { currentPassword, newPassword, confirmNewPassword } = data;
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      return { error: 'Password is required' };
    }
    if (newPassword !== confirmNewPassword) {
      return { error: 'Passwords do not match' };
    }

    if (!existingUser) return { error: 'User not found!' };
    if (!existingUser.password) {
      return { error: 'User password not found!' };
    }
    const matchPassword = await bcryptjs.compare(
      currentPassword,
      existingUser.password
    );
    if (!matchPassword) {
      return { error: 'Invalid credentials' };
    }

    const hashedPassword = await bcryptjs.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: existingUser.id },
      data: {
        password: hashedPassword,
      },
    });

    return { success: 'Your password has been successfully updated.' };
  } catch (error) {
    return { error: error };
  }
};

export const updateAvatar = async (email: string, avatar: string) => {
  try {
    const existingUser = await prisma.user.findFirst({
      where: { email: email },
    });
    if (!existingUser) return { error: 'User not found!' };
    await prisma.user.update({
      where: { id: existingUser.id },
      data: {
        avatar: avatar,
      },
    });
    return { success: 'Your avatar has been successfully updated.' };
  } catch (error) {
    return { error: error };
  }
};

export const removeAvatar = async (email: string) => {
  try {
    const existingUser = await prisma.user.findFirst({
      where: { email: email },
    });
    if (!existingUser) return { error: 'User not found!' };
    await prisma.user.update({
      where: { id: existingUser.id },
      data: {
        avatar: null,
      },
    });
    return { success: 'Your avatar has been successfully removed.' };
  } catch (error) {
    return { error: error };
  }
};

export const deleteUser = async (email: string) => {
  try {
    const existingUser = await prisma.user.findFirst({
      where: { email: email },
    });
    if (!existingUser) return { error: 'User not found!' };
    await prisma.user.delete({
      where: { id: existingUser.id },
    });
    return { success: 'Your account has been successfully deleted.' };
  } catch (error) {
    return { error: (error as Error).message || 'Some Error Occured' };
  }
};

export const addUserSkills = withServerActionAsyncCatcher<
  addSkillsSchemaType,
  ServerActionReturnType
>(async (data) => {
  const auth = await getServerSession(authOptions);

  if (!auth || !auth?.user?.id)
    throw new ErrorHandler('Not Authorized', 'UNAUTHORIZED');

  try {
    await prisma.user.update({
      where: {
        id: auth.user.id,
      },
      data: {
        skills: data.skills,
      },
    });
    return new SuccessResponse('Skills updated successfully', 200).serialize();
  } catch (_error) {
    return new ErrorHandler('Internal server error', 'DATABASE_ERROR');
  }
});

export const addUserExperience = withServerActionAsyncCatcher<
  expFormSchemaType,
  ServerActionReturnType
>(async (data) => {
  const auth = await getServerSession(authOptions);

  if (!auth || !auth?.user?.id)
    throw new ErrorHandler('Not Authorized', 'UNAUTHORIZED');

  try {
    await prisma.experience.create({
      data: {
        ...data,
        userId: auth.user.id,
      },
    });
    return new SuccessResponse(
      'Experience updated successfully',
      200
    ).serialize();
  } catch (_error) {
    return new ErrorHandler('Internal server error', 'DATABASE_ERROR');
  }
});

export const addUserProjects = withServerActionAsyncCatcher<
  projectSchemaType,
  ServerActionReturnType
>(async (data) => {
  const auth = await getServerSession(authOptions);

  if (!auth || !auth?.user?.id)
    throw new ErrorHandler('Not Authorized', 'UNAUTHORIZED');

  try {
    await prisma.project.create({
      data: {
        ...data,
        userId: auth.user.id,
      },
    });
    return new SuccessResponse('Project updated successfully', 200).serialize();
  } catch (_error) {
    return new ErrorHandler('Internal server error', 'DATABASE_ERROR');
  }
});

export const validateUserBoarding = async () => {
  const auth = await getServerSession(authOptions);

  if (!auth || !auth?.user?.id)
    throw new ErrorHandler('Not Authorized', 'UNAUTHORIZED');

  try {
    await prisma.user.update({
      where: {
        id: auth.user.id,
      },
      data: {
        onBoard: true,
      },
    });
    return new SuccessResponse(
      'Welcome!! On Boarding successfully',
      200
    ).serialize();
  } catch (_error) {
    return new ErrorHandler('Internal server error', 'DATABASE_ERROR');
  }
};
export const addUserResume = async (resume: string) => {
  const auth = await getServerSession(authOptions);

  if (!auth || !auth?.user?.id)
    throw new ErrorHandler('Not Authorized', 'UNAUTHORIZED');

  try {
    await prisma.user.update({
      where: {
        id: auth.user.id,
      },
      data: {
        resume: resume,
      },
    });
    return new SuccessResponse('Resume SuccessFully Uploaded', 200).serialize();
  } catch (_error) {
    return new ErrorHandler('Internal server error', 'DATABASE_ERROR');
  }
};

export const getUserExperience = async () => {
  const auth = await getServerSession(authOptions);

  if (!auth || !auth?.user?.id)
    throw new ErrorHandler('Not Authorized', 'UNAUTHORIZED');
  try {
    const res = await prisma.experience.findMany({
      where: {
        userId: auth.user.id,
      },
    });
    return new SuccessResponse(
      'Experience SuccessFully Fetched',
      200,
      res
    ).serialize();
  } catch (_error) {
    return new ErrorHandler('Internal server error', 'DATABASE_ERROR');
  }
};
export const getUserProjects = async () => {
  const auth = await getServerSession(authOptions);

  if (!auth || !auth?.user?.id)
    throw new ErrorHandler('Not Authorized', 'UNAUTHORIZED');
  try {
    const res = await prisma.project.findMany({
      where: {
        userId: auth.user.id,
      },
    });
    return new SuccessResponse(
      'Project SuccessFully Fetched',
      200,
      res
    ).serialize();
  } catch (_error) {
    return new ErrorHandler('Internal server error', 'DATABASE_ERROR');
  }
};

export const getUserDetails = async () => {
  const auth = await getServerSession(authOptions);

  if (!auth || !auth?.user?.id)
    throw new ErrorHandler('Not Authorized', 'UNAUTHORIZED');
  try {
    const res = await prisma.user.findFirst({
      where: {
        id: auth.user.id,
      },
      select: {
        skills: true,
        resume: true,
      },
    });
    return new SuccessResponse(
      'Project SuccessFully Fetched',
      200,
      res
    ).serialize();
  } catch (_error) {
    return new ErrorHandler('Internal server error', 'DATABASE_ERROR');
  }
};
