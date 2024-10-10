'use server';
import prisma from '@/config/prisma.config';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { ErrorHandler } from '@/lib/error';
import { CompanySchema } from '@/lib/validators/companies.validator';

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

export const createCompany = async (data: any) => {
  const auth = await getServerSession(authOptions);
  if (!auth || !auth?.user?.id)
    throw new ErrorHandler('Not Authorized', 'UNAUTHORIZED');
  const result = CompanySchema.parse(data);
  const { name, email, website, bio, logo } = result;

  const company = await prisma.company.create({
    data: {
      userId: auth.user.id,
      name,
      email,
      website,
      bio,
      logo,
    },
  });
  return {
    msg: 'Company has been successfully created.',
    status: 201,
    data: {
      company,
    },
  };
};
