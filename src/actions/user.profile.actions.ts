'use server';
import prisma from '@/config/prisma.config';
import { UserProfileSchemaType } from '@/lib/validators/user.profile.validator';
import bcryptjs from 'bcryptjs';

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
