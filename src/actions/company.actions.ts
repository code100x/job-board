'use server';
import prisma from '@/config/prisma.config';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

export const getAllCompanies = async () => {
  const auth = await getServerSession(authOptions);
  const companies = await prisma.company.findMany({
    where: {
      userId: auth?.user.id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      website: true,
      bio: true,
      logo: true,
    },
  });
  return {
    msg: 'Companies has been successfully fetched.',
    status: 200,
    data: {
      companies,
    },
  };
};
