import { z } from 'zod';

export const SigninSchema = z.object({
  email: z.string().email('Email is invalid').min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required'),
});

export type SigninSchemaType = z.infer<typeof SigninSchema>;

export const companySetupSchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  companyWebsite: z.string().url('Invalid URL'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  logo: z.string().optional(),
});

// Define the company info schema
export const CompanyInfoSchema = z.object({
  name: z.string(),
  website: z.string().optional(),
  description: z.string().optional(),
  logo: z.string().optional(),
});

// Extend the base signup schema
export const SignupSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['USER', 'HR']).default('USER'),
  companyInfo: CompanyInfoSchema.optional(),
});

export type CompanyInfo = z.infer<typeof CompanyInfoSchema>;
export type SignupData = z.infer<typeof SignupSchema>;

export type SignupSchemaType = z.infer<typeof SignupSchema>;

export type companySetupSchema = z.infer<typeof companySetupSchema>;
