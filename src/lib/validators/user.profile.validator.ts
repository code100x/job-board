import {
  DegreeType,
  EmployementType,
  FieldOfStudyType,
  WorkMode,
} from '@prisma/client';
import { z } from 'zod';

export const UserProfileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Email is invalid').min(1, 'Email is required'),
});

export type UserProfileSchemaType = z.infer<typeof UserProfileSchema>;

export const UserPasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(6, 'Password must be at least of 6 characters.'),
  newPassword: z.string().min(6, 'Password must be at least of 6 characters.'),
  confirmNewPassword: z
    .string()
    .min(6, 'Password must be at least of 6 characters.'),
});
export const addSkillsSchema = z.object({
  skills: z.array(z.string()).optional(),
});
export const expFormSchema = z.object({
  companyName: z.string().min(1, { message: 'Company Name is required' }),
  designation: z.string().min(1, { message: 'Designation is required' }),
  EmploymentType: z.nativeEnum(EmployementType, {
    message: 'Employement type is required',
  }),
  address: z.string().min(1, { message: 'Address is required' }),
  workMode: z.nativeEnum(WorkMode, {
    message: 'Work mode is required',
  }),
  currentWorkStatus: z.boolean({
    required_error: 'Current work status is required',
  }),
  startDate: z.date({
    required_error: 'Start date is required',
    invalid_type_error: 'Invalid date',
  }),
  endDate: z.date({ invalid_type_error: 'Invalid date' }).optional(),
  description: z
    .string()
    .min(50, { message: 'Description must be at least 50 characters' })
    .max(255, { message: 'Description cannot exceed 255 characters' }),
});
export const projectSchema = z.object({
  projectThumbnail: z.string().optional(),
  projectName: z.string().min(1, 'Project name is required'),
  projectSummary: z
    .string()
    .min(20, { message: 'Summary must be at least 20 characters' })
    .max(255, { message: 'Summary cannot exceed 255 characters' }),
  projectLiveLink: z
    .string()
    .url({ message: 'Invalid URL format' })
    .refine((url) => url.startsWith('https://'), {
      message: 'URL must be a https request',
    })
    .optional(),
  projectGithub: z
    .string({ message: 'Github Link is required' })
    .url({ message: 'Invalid URL format' })
    .refine((url) => url.startsWith('https://github.com/'), {
      message: 'URL must be a GitHub link starting with "https://github.com/"',
    }),
  stack: z.enum([
    'GO',
    'PYTHON',
    'MERN',
    'NEXTJS',
    'AI_GPT_APIS',
    'SPRINGBOOT',
    'OTHERS',
  ]),
});

export const aboutMeSchema = z.object({
  aboutMe: z
    .string()
    .min(50, { message: 'Description must be at least 50 characters' })
    .max(255, { message: 'Description cannot exceed 255 characters' })
    .optional()
    .or(z.literal('')),
});

export const profileSchema = z.object({
  avatar: z.string().optional(),
  name: z.string().min(1, 'Name is required'),
  email: z.string().min(1, 'Email is required').email(),
  contactEmail: z.string().email().optional().or(z.literal('')),
  aboutMe: z
    .string()
    .min(50, { message: 'Description must be at least 50 characters' })
    .max(255, { message: 'Description cannot exceed 255 characters' })
    .optional(),
  githubLink: z
    .string()
    .refine((url) => url === '' || url.startsWith('https://github.com/'), {
      message: 'URL must be a GitHub link starting with "https://github.com/"',
    }),
  portfolioLink: z
    .string()
    .refine((url) => url === '' || url.startsWith('https://'), {
      message: 'URL must start with "https"',
    }),
  linkedinLink: z
    .string()
    .refine((url) => url === '' || url.startsWith('https://linkedin.com/'), {
      message:
        'URL must be a LinkedIn link starting with "https://linkedin.com/"',
    }),
  twitterLink: z
    .string()
    .refine((url) => url === '' || url.startsWith('https://x.com/'), {
      message: 'URL must be a Twitter link starting with "https://x.com/"',
    }),
  discordLink: z
    .string()
    .refine((url) => url === '' || url.startsWith('https://discordapp.com/'), {
      message:
        'URL must be a Discord link starting with "https://discordapp.com/"',
    }),
});

export const profileResumeSchema = z.object({
  resume: z.string().min(1, 'Resume is required.'),
});

export const profileProjectSchema = z.object({
  projectThumbnail: z.string().min(1, 'Project Thumbnail is required.'),
  projectName: z.string().min(1, 'Project name is required'),
  projectSummary: z
    .string()
    .min(20, { message: 'Summary must be at least 20 characters' })
    .max(255, { message: 'Summary cannot exceed 255 characters' }),
  projectLiveLink: z
    .string()
    .url({ message: 'Invalid URL format' })
    .refine((url) => url.startsWith('https://'), {
      message: 'URL must be a https request',
    })
    .optional()
    .or(z.literal('')),
  projectGithub: z
    .string({ message: 'Github Link is required' })
    .url({ message: 'Invalid URL format' })
    .refine((url) => url.startsWith('https://github.com/'), {
      message: 'URL must be a GitHub link starting with "https://github.com/"',
    }),
  isFeature: z.boolean().default(false),
  stack: z.enum([
    'GO',
    'PYTHON',
    'MERN',
    'NEXTJS',
    'AI_GPT_APIS',
    'SPRINGBOOT',
    'OTHERS',
  ]),
});

export const profileEducationSchema = z
  .object({
    instituteName: z.string().min(1, 'Institute Name is required.'),
    degree: z.nativeEnum(DegreeType, {
      message: 'Employement type is required',
    }),
    fieldOfStudy: z.nativeEnum(FieldOfStudyType, {
      message: 'Employement type is required',
    }),
    startDate: z.date({
      required_error: 'Start date is required',
      invalid_type_error: 'Invalid date',
    }),
    endDate: z.date({ invalid_type_error: 'Invalid date' }).optional(),
  })
  .refine((data) => !data.endDate || data.startDate <= data.endDate, {
    message: 'Start date cannot be later than end date.',
    path: ['endDate'],
  });

export type projectSchemaType = z.infer<typeof projectSchema>;
export type expFormSchemaType = z.infer<typeof expFormSchema>;
export type addSkillsSchemaType = z.infer<typeof addSkillsSchema>;
export type UserPasswordSchemaType = z.infer<typeof UserPasswordSchema>;
export type AboutMeSchemaType = z.infer<typeof aboutMeSchema>;
export type ProfileSchemaType = z.infer<typeof profileSchema>;
export type ProfileResumeType = z.infer<typeof profileResumeSchema>;
export type ProfileProjectType = z.infer<typeof profileProjectSchema>;
export type profileEducationType = z.infer<typeof profileEducationSchema>;

export const UserProfileDestroySchema = z.object({
  random: z
    .string({ message: 'Required' })
    .min(1, { message: 'Min 1 char long' })
    .max(8, { message: "Can't be more long" }),
});

export type UserProfileDestroyType = z.infer<typeof UserProfileDestroySchema>;
