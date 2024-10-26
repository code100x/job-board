'use server';
import prisma from '@/config/prisma.config';
import {
  aboutMeSchema,
  AboutMeSchemaType,
  addSkillsSchemaType,
  expFormSchemaType,
  profileEducationType,
  ProfileProjectType,
  profileSchema,
  ProfileSchemaType,
  // projectSchemaType,
  UserProfileSchemaType,
} from '@/lib/validators/user.profile.validator';
import bcryptjs from 'bcryptjs';
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import { ErrorHandler } from '@/lib/error';
import { withServerActionAsyncCatcher } from '@/lib/async-catch';
import { ServerActionReturnType } from '@/types/api.types';
import { SuccessResponse } from '@/lib/success';
import { withSession } from '@/lib/session';
import { revalidatePath } from 'next/cache';

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

export const changePassword = async (data: {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}) => {
  try {
    const auth = await getServerSession(authOptions);

    if (!auth || !auth?.user?.id)
      throw new ErrorHandler('Not Authorized', 'UNAUTHORIZED');

    const { currentPassword, newPassword, confirmNewPassword } = data;
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      throw new ErrorHandler('Invalid Data', 'BAD_REQUEST');
    }
    if (newPassword !== confirmNewPassword) {
      throw new ErrorHandler('Invalid Data', 'BAD_REQUEST');
    }

    const existingUser = await prisma.user.findFirst({
      where: { id: auth.user.id },
    });

    if (!existingUser) throw new ErrorHandler('User Not Found', 'NOT_FOUND');
    if (!existingUser.password) {
      throw new ErrorHandler('Invalid Credientials', 'AUTHENTICATION_FAILED');
    }
    const matchPassword = await bcryptjs.compare(
      currentPassword,
      existingUser.password
    );
    if (!matchPassword) {
      throw new ErrorHandler('Invalid Credientials', 'AUTHENTICATION_FAILED');
    }

    const hashedPassword = await bcryptjs.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: existingUser.id },
      data: {
        password: hashedPassword,
      },
    });

    return new SuccessResponse(
      'Successfully Password Updated.',
      200
    ).serialize();
  } catch (_error) {
    throw new ErrorHandler(
      'Something went wrong while changing password.',
      'INTERNAL_SERVER_ERROR'
    );
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
    revalidatePath(`/newProfile/${auth.user.id}`);
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
    revalidatePath(`/newProfile/${auth.user.id}`);
    return new SuccessResponse(
      'Experience added successfully',
      200
    ).serialize();
  } catch (_error) {
    return new ErrorHandler('Internal server error', 'DATABASE_ERROR');
  }
});
export const addUserEducation = withServerActionAsyncCatcher<
  profileEducationType,
  ServerActionReturnType
>(async (data) => {
  const auth = await getServerSession(authOptions);

  if (!auth || !auth?.user?.id)
    throw new ErrorHandler('Not Authorized', 'UNAUTHORIZED');

  try {
    await prisma.education.create({
      data: {
        ...data,
        userId: auth.user.id,
      },
    });
    revalidatePath(`/newProfile/${auth.user.id}`);
    return new SuccessResponse('Education added successfully', 200).serialize();
  } catch (_error) {
    return new ErrorHandler('Internal server error', 'DATABASE_ERROR');
  }
});

export const addUserProjects = withServerActionAsyncCatcher<
  ProfileProjectType,
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
    revalidatePath(`/newProfile/${auth.user.id}`);
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
        resumeUpdateDate: new Date(),
      },
    });
    revalidatePath(`/newProfile/${auth.user.id}`);
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

export const getUserDetailsWithId = async (id: string) => {
  try {
    const res = await prisma.user.findFirst({
      where: {
        id: id,
      },
      select: {
        username: true,
        name: true,
        id: true,
        skills: true,
        education: true,
        experience: true,
        email: true,
        contactEmail: true,
        resume: true,
        avatar: true,
        aboutMe: true,
        project: true,
        resumeUpdateDate: true,
      },
    });
    if (!res) throw new ErrorHandler('User Not Found', 'NOT_FOUND');
    return new SuccessResponse(
      'User SuccessFully Fetched',
      200,
      res
    ).serialize();
  } catch (_error) {
    return new ErrorHandler('Internal server error', 'DATABASE_ERROR');
  }
};

export const updateUserDetails = withSession<
  ProfileSchemaType,
  ServerActionReturnType<any>
>(async (session, userData) => {
  if (!session || !session?.user?.id) {
    throw new ErrorHandler('Not Authrised', 'UNAUTHORIZED');
  }
  const { success, data } = profileSchema.safeParse(userData);
  if (!success) {
    throw new ErrorHandler('Invalid Data', 'BAD_REQUEST');
  }

  if (data) {
    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        name: data.name,
        username: data.username,
        email: data.email,
        contactEmail: data.contactEmail,
        aboutMe: data.aboutMe,
        avatar: data.avatar,
      },
    });
    revalidatePath(`/newProfile/${session.user.id}`);
  }

  return new SuccessResponse(
    'User profile updated successfully.',
    200
  ).serialize();
});

export const updateAboutMe = withSession<
  AboutMeSchemaType,
  ServerActionReturnType<any>
>(async (session, userData) => {
  if (!session || !session?.user?.id) {
    throw new ErrorHandler('Not Authrised', 'UNAUTHORIZED');
  }
  const { success, data } = aboutMeSchema.safeParse(userData);
  if (!success) {
    throw new ErrorHandler('Invalid Data', 'BAD_REQUEST');
  }

  if (data) {
    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        aboutMe: data.aboutMe,
      },
    });
  }
  revalidatePath(`/newProfile/${session.user.id}`);
  return new SuccessResponse('Successfully updated About Me.', 200).serialize();
});

export const deleteResume = async () => {
  const auth = await getServerSession(authOptions);

  if (!auth || !auth?.user?.id)
    throw new ErrorHandler('Not Authorized', 'UNAUTHORIZED');
  try {
    // todo: delete file form cdn
    await prisma.user.update({
      where: {
        id: auth.user.id,
      },
      data: {
        resume: null,
        resumeUpdateDate: null,
      },
    });
    revalidatePath(`/newProfile/${auth.user.id}`);
    return new SuccessResponse('Resume Deleted Successfully', 200).serialize();
  } catch (_error) {
    return new ErrorHandler('Internal server error', 'DATABASE_ERROR');
  }
};
export const deleteProject = async (projectId: number) => {
  const auth = await getServerSession(authOptions);

  if (!auth || !auth?.user?.id)
    throw new ErrorHandler('Not Authorized', 'UNAUTHORIZED');
  try {
    // todo: delete image file form cdn
    await prisma.project.delete({
      where: {
        id: projectId,
      },
    });
    revalidatePath(`/newProfile/${auth.user.id}`);
    return new SuccessResponse('Project Deleted Successfully', 200).serialize();
  } catch (_error) {
    return new ErrorHandler('Internal server error', 'DATABASE_ERROR');
  }
};

export const editProject = withServerActionAsyncCatcher<
  { data: ProfileProjectType; id: number },
  ServerActionReturnType
>(async ({ data, id }) => {
  const auth = await getServerSession(authOptions);

  if (!auth || !auth?.user?.id)
    throw new ErrorHandler('Not Authorized', 'UNAUTHORIZED');

  try {
    await prisma.project.update({
      where: {
        id: id,
        userId: auth.user.id,
      },
      data: {
        ...data,
      },
    });
    revalidatePath(`/newProfile/${auth.user.id}`);
    return new SuccessResponse('Project updated successfully', 200).serialize();
  } catch (_error) {
    return new ErrorHandler('Internal server error', 'DATABASE_ERROR');
  }
});
export const editExperience = withServerActionAsyncCatcher<
  { data: expFormSchemaType; id: number },
  ServerActionReturnType
>(async ({ data, id }) => {
  const auth = await getServerSession(authOptions);

  if (!auth || !auth?.user?.id)
    throw new ErrorHandler('Not Authorized', 'UNAUTHORIZED');

  try {
    await prisma.experience.update({
      where: {
        id: id,
        userId: auth.user.id,
      },
      data: {
        ...data,
      },
    });
    revalidatePath(`/newProfile/${auth.user.id}`);
    return new SuccessResponse(
      'Experience updated successfully',
      200
    ).serialize();
  } catch (_error) {
    return new ErrorHandler('Internal server error', 'DATABASE_ERROR');
  }
});
export const editEducation = withServerActionAsyncCatcher<
  { data: profileEducationType; id: number },
  ServerActionReturnType
>(async ({ data, id }) => {
  const auth = await getServerSession(authOptions);

  if (!auth || !auth?.user?.id)
    throw new ErrorHandler('Not Authorized', 'UNAUTHORIZED');

  try {
    await prisma.education.update({
      where: {
        id: id,
        userId: auth.user.id,
      },
      data: {
        ...data,
      },
    });
    revalidatePath(`/newProfile/${auth.user.id}`);
    return new SuccessResponse(
      'Experience updated successfully',
      200
    ).serialize();
  } catch (_error) {
    return new ErrorHandler('Internal server error', 'DATABASE_ERROR');
  }
});

export const deleteExperience = async (experienceId: number) => {
  const auth = await getServerSession(authOptions);

  if (!auth || !auth?.user?.id)
    throw new ErrorHandler('Not Authorized', 'UNAUTHORIZED');
  try {
    // todo: delete image file form cdn
    await prisma.experience.delete({
      where: {
        id: experienceId,
        userId: auth.user.id,
      },
    });
    revalidatePath(`/newProfile/${auth.user.id}`);
    return new SuccessResponse('Project Deleted Successfully', 200).serialize();
  } catch (_error) {
    return new ErrorHandler('Internal server error', 'DATABASE_ERROR');
  }
};
export const deleteEducation = async (educationId: number) => {
  const auth = await getServerSession(authOptions);

  if (!auth || !auth?.user?.id)
    throw new ErrorHandler('Not Authorized', 'UNAUTHORIZED');
  try {
    // todo: delete image file form cdn
    await prisma.education.delete({
      where: {
        id: educationId,
        userId: auth.user.id,
      },
    });
    revalidatePath(`/newProfile/${auth.user.id}`);
    return new SuccessResponse('Project Deleted Successfully', 200).serialize();
  } catch (_error) {
    return new ErrorHandler('Internal server error', 'DATABASE_ERROR');
  }
};
