import { z } from "zod";

export const workExperienceSchema = z.object({
  companyName: z.string().min(1, "Company is required"),
  title: z.string().min(1, "Title is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  currentlyWork: z.boolean(),
  description: z.string().optional(),
  positionType: z.enum(["FULLTIME", "PARTTIME", "CONTRACT", "INTERNSHIP"]),
});

export const profileDataSchema = z.object({
  name: z.string().min(1),
  location: z.string().min(1),
  role: z.string().min(1),
  experience: z.string().min(1),
  bio: z.string().optional(),
  website: z.string().url().optional(),
  linkedin: z.string().url().optional(),
  github: z.string().url().optional(),
  twitter: z.string().url().optional(),
  projects: z.array(
    z.object({
      id: z.string(),
      companyName: z.string(),
      title: z.string(),
      startDate: z.string(),
      endDate: z.string().optional(),
      currentlyWork: z.boolean(),
      description: z.string().optional(),
      positionType: z.enum(["FULLTIME", "PARTTIME", "CONTRACT", "INTERNSHIP"]),
    })
  ),
  skills: z.array(z.string()),
  achievements: z.string().optional(),
});

// Types inferred from schemas
export type ProfileData = z.infer<typeof profileDataSchema>;
export type WorkExperience = z.infer<typeof workExperienceSchema>;
