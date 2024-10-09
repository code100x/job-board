import { z } from 'zod';

export const CompanySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Email is invalid').min(1, 'Email is required'),
  website: z.string().optional(),
  bio: z.string().min(1, 'Description is required'),
  logo: z.string().url(),
});

export const CompanyByIdSchema = z.object({
  id: z.string().min(1, 'Job id is required'),
});

export type CompanySchemaType = z.infer<typeof CompanySchema>;
export type CompanyByIdSchemaType = z.infer<typeof CompanyByIdSchema>;
