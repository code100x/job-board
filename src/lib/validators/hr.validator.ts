import { z } from 'zod';

export const HRPostSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email').min(1, 'Email is required'),
  companyBio: z.string().min(1, 'Company Bio is required'),
  companyLogo: z.string().min(1, 'Company Logo is Required'),
  companyName: z.string().min(1, 'Company Name is Required'),
});

export type HRPostSchemaType = z.infer<typeof HRPostSchema>;
