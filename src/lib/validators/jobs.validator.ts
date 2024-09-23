import { z } from 'zod';
import { WorkMode, EmployementType } from '@prisma/client';

export const JobPostSchema = z
  .object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    companyName: z.string().min(1, 'Company Name is required'),
    city: z.string().min(1, 'City Name is required'),
    address: z.string().min(1, 'Address is required'),
    application: z.string().min(1, 'Application link is required'),
    type: z.nativeEnum(EmployementType, {
      message: 'Employment Type is Required',
    }),
    skills: z.array(z.string()),
    category: z.string(),
    companyEmail: z.string().email('Invalid email').min(1, 'Email is required'),
    companyBio: z.string().min(1, 'Company Bio is required'),
    companyLogo: z.string().url(),
    hasSalaryRange: z.boolean(),
    minSalary: z.coerce
      .number({ message: 'Min salary must be a number' })
      .nonnegative()
      .optional(),
    maxSalary: z.coerce
      .number({ message: 'Max salary must be a number' })
      .nonnegative()
      .optional(),
    hasExperiencerange: z.boolean(),
    minExperience: z.coerce
      .number({ message: 'Min Experience must be a number' })
      .nonnegative()
      .optional(),
    maxExperience: z.coerce
      .number({ message: 'Max Experience must be a number' })
      .nonnegative()
      .optional(),
    workMode: z.nativeEnum(WorkMode, {
      message: 'Work mode is required',
    }),
  })
  .superRefine((data, ctx) => {
    if (data.hasSalaryRange) {
      if (!data.minSalary) {
        return ctx.addIssue({
          message: 'minSalary is required ',
          path: ['minSalary'],
          code: z.ZodIssueCode.custom,
        });
      }
      if (!data.maxSalary) {
        return ctx.addIssue({
          message: 'maxSalary is required ',
          path: ['maxSalary'],
          code: z.ZodIssueCode.custom,
        });
      }
      if (data.maxSalary <= data.minSalary) {
        return ctx.addIssue({
          message: 'minSalary cannot be greater than or equal to maxSalary',
          path: ['minSalary'],
          code: z.ZodIssueCode.custom,
        });
      }
    }
    return true;
  });

export const JobQuerySchema = z.object({
  EmpType: z
    .union([z.string(), z.array(z.nativeEnum(EmployementType))])
    .optional()
    .transform((val) => {
      if (typeof val === 'string') {
        return val.split(',');
      }
      return val;
    }),
  workmode: z
    .union([z.string(), z.array(z.nativeEnum(WorkMode))])
    .optional()
    .transform((val) => {
      if (typeof val === 'string') {
        return val.split(',');
      }
      return val;
    }),
  city: z
    .union([z.string(), z.array(z.string())])
    .optional()
    .transform((val) => {
      if (typeof val === 'string') {
        return val.split(',');
      }
      return val;
    }),
  search: z.string().optional(),
  salaryrange: z
    .union([z.string(), z.array(z.string())])
    .optional()
    .transform((val) => {
      if (typeof val === 'string') {
        return val.split(',');
      }
      return val;
    }),
  sortby: z.enum(['postedat_asc', 'postedat_desc']).default('postedat_desc'),
  page: z.coerce
    .number({ message: 'page must be a number' })
    .optional()
    .default(1),
  isFeatured: z.boolean().optional(),
  limit: z.number().optional(),
});

export const JobByIdSchema = z.object({
  id: z.string().min(1, 'Job id is required'),
});

export type JobByIdSchemaType = z.infer<typeof JobByIdSchema>;
export type JobPostSchemaType = z.infer<typeof JobPostSchema>;
export type JobQuerySchemaType = z.infer<typeof JobQuerySchema>;
