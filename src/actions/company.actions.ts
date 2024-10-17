'use server';
import prisma from '@/config/prisma.config';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { ErrorHandler } from '@/lib/error';
import {
  CompanySchema,
  CompanyUpdateSchema,
  CompanyUpdateSchemaType,
} from '@/lib/validators/companies.validator';
import { CompanySchemaType } from '@/lib/validators/companies.validator';

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
      createdAt: true,
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

export const createCompany = async (data: CompanySchemaType) => {
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

export const updateCompany = async (
  id: string,
  data: CompanyUpdateSchemaType
) => {
  const auth = await getServerSession(authOptions);
  if (!auth || !auth?.user?.id) {
    throw new ErrorHandler('Not Authorized', 'UNAUTHORIZED');
  }

  // Validate the incoming data against the schema
  const result = CompanyUpdateSchema.parse(data);
  const { name, email, website, bio, logo } = result;

  const company = await prisma.company.update({
    where: {
      id: id,
      userId: auth.user.id,
    },
    data: {
      name,
      email,
      website,
      bio,
      logo,
    },
  });

  return {
    msg: 'Company has been successfully updated.',
    status: 200,
    data: {
      company,
    },
  };
};

export const deleteCompany = async (id: string) => {
  const auth = await getServerSession(authOptions);
  if (!auth || !auth?.user?.id) {
    throw new ErrorHandler('Not Authorized', 'UNAUTHORIZED');
  }

  const company = await prisma.company.findUnique({
    where: {
      id: id,
    },
  });

  if (!company || company.userId !== auth.user.id) {
    throw new ErrorHandler('Company not found or not authorized', 'NOT_FOUND');
  }

  await prisma.company.delete({
    where: {
      id: id,
    },
  });

  return {
    msg: 'Company has been successfully deleted.',
    status: 200,
  };
};
