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

export type UserPasswordSchemaType = z.infer<typeof UserPasswordSchema>;

export const UserProfileDestroySchema = z.object({
  random: z
    .string({ message: 'Required' })
    .min(1, { message: 'Min 1 char long' })
    .max(8, { message: "Can't be more long" }),
});

export type UserProfileDestroyType = z.infer<typeof UserProfileDestroySchema>;
