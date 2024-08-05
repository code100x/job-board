import { ExperienceLevel, JobType } from "@prisma/client";
import { z } from "zod";

export const NewPasswordSchema = z.object({
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const ResetSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export const RegisterSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Email is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const JobSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  type: z.nativeEnum(JobType),
  location: z.string().min(1, { message: "Location is required" }),
  salaryRange: z.string().min(1, { message: "Salary range is required" }),
  experience: z.nativeEnum(ExperienceLevel),
  companyName: z.string().min(1, { message: "Company name is required" }),
  companyLogo: z.string().min(1, { message: "Company logo is required" }),
});
