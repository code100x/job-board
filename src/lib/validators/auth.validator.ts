import { z } from 'zod';

export const SigninSchema = z.object({
  email: z.string().email('Email is invalid').min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required'),
});

export type SigninSchemaType = z.infer<typeof SigninSchema>;

export const SignupSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Email is invalid').min(1, 'Email is required'),
  password: z
    .string()
    .min(1, 'Password is required')
    .regex(/[a-z]/, 'Password must contain one lowercase letter')
    .regex(/[A-Z]/, 'Password must contain one uppercase letter')
    .regex(/[0-9]/, 'Password must contain atleast one number')
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Password must contain at least one special character'
    ),
});

export type SignupSchemaType = z.infer<typeof SignupSchema>;
