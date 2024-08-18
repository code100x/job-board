import { z } from 'zod';
import { WorkModeEnums } from '../constant/jobs.constant';

export const JobPostSchema = z
  .object({
    title: z.string().min(1, 'Job title is required'),
    description: z
      .string()
      .min(10, 'Job description must be at least 10 characters'),
    companyName: z.string().min(1, 'Company name is required'),
    location: z.string().min(1, 'Location is required'),
    workMode: z.enum(['remote', 'office', 'hybrid'], {
      message: 'Work mode is required',
    }),
    jobType: z.enum([
      'Full-time',
      'Part-time',
      'Contract',
      'Temporary',
      'Internship',
    ]),
    experienceLevel: z.enum(['Entry', 'Mid-level', 'Senior', 'Executive']),
    requiredSkills: z
      .array(z.string())
      .min(1, 'At least one skill is required'),
    educationLevel: z.string().min(1, 'Education level is required'),
    yearsOfExperience: z
      .number()
      .min(0, 'Years of experience must be 0 or greater'),
    hasSalaryRange: z.boolean(),
    minSalary: z.number().min(0, 'Minimum salary must be 0 or greater'),
    maxSalary: z.number().min(0, 'Maximum salary must be 0 or greater'),
    benefits: z.array(z.string()),
    applicationDeadline: z.string().optional(),
    numberOfOpenings: z
      .number()
      .min(1, 'Number of openings must be at least 1'),
    travelRequirements: z.string().optional(),
    remoteWorkOption: z.boolean(),
  })
  .superRefine((data, ctx) => {
    if (data.hasSalaryRange) {
      if (!data.minSalary) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Minimum salary is required when salary range is enabled',
          path: ['minSalary'],
        });
      }
      if (!data.maxSalary) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Maximum salary is required when salary range is enabled',
          path: ['maxSalary'],
        });
      }
      if (data.maxSalary <= data.minSalary) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Maximum salary must be greater than minimum salary',
          path: ['maxSalary'],
        });
      }
    }
  });
export const JobQuerySchema = z.object({
  workmode: z
    .union([
      z.string(),
      z.array(
        z.enum([
          WorkModeEnums.REMOTE,
          WorkModeEnums.HYBRID,
          WorkModeEnums.OFFICE,
        ])
      ),
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
        return [val];
      }
      return val;
    }),
  search: z.string().optional(),
  salaryrange: z
    .union([z.string(), z.array(z.string())])
    .optional()
    .transform((val) => {
      if (typeof val === 'string') {
        return [val];
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
