import { z } from 'zod';
import { Category, JobType, WorkMode, SortBy } from '../constant/jobs.constant';

export const JobPostSchema = z
  .object({
    title: z.string().min(1, 'Title is required'),
    application: z.string().min(1, 'Application is required'),
    description: z.string().min(1, 'Description is required'),
    companyName: z.string().min(1, 'Company Name is required'),
    companyEmail: z.string().email('Invalid email').min(1, 'Email is required'),
    companyBio: z.string().min(1, 'Company Bio is required'),
    location: z.string().min(1, 'Location is required'),
    hasSalaryRange: z.boolean(),
    minSalary: z.coerce
      .number({ message: 'Min salary must be a number' })
      .nonnegative()
      .optional(),
    maxSalary: z.coerce
      .number({ message: 'Max salary must be a number' })
      .nonnegative()
      .optional(),
    workMode: z.enum([WorkMode.REMOTE, WorkMode.OFFICE, WorkMode.HYBRID], {
      message: 'Work mode is required',
    }),
    category: z.enum(Object.values(Category) as [string, ...string[]], {
      message: 'Category is required',
    }),
    type: z.enum(
      [
        JobType.FULLTIME,
        JobType.PARTTIME,
        JobType.CONTRACT,
        JobType.INTERNSHIP,
      ],
      {
        message: 'Type is required',
      }
    ),
  })
  .superRefine((data, ctx) => {
    if (data.hasSalaryRange) {
      if (!data.minSalary) {
        return ctx.addIssue({
          message: 'minSalary is required when hasSalaryRange is true',
          path: ['minSalary'],
          code: z.ZodIssueCode.custom,
        });
      }
      if (!data.maxSalary) {
        return ctx.addIssue({
          message: 'maxSalary is required when hasSalaryRange is true',
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
  workmode: z
    .union([
      z.string(),
      z.array(z.enum(Object.values(WorkMode) as [string, ...string[]])),
    ])
    .optional()
    .transform((val) => {
      if (typeof val === 'string') {
        return val.split(',');
      }
      return val;
    }),
  category: z
    .union([
      z.string(),
      z.array(z.enum(Object.values(Category) as [string, ...string[]])),
    ])
    .optional()
    .transform((val) => {
      if (typeof val === 'string') {
        return [val];
      }
      return val;
    }),

  type: z
    .union([
      z.string(),
      z.array(z.enum(Object.values(JobType) as [string, ...string[]])),
    ])
    .optional()
    .transform((val) => {
      if (typeof val === 'string') {
        return [val];
      }
      return val;
    }),
  location: z
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
  sortby: z
    .enum(Object.values(SortBy) as [string, ...string[]])
    .default(SortBy.POSTEDAT_DESC),
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
