import { z } from "zod";

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(2),
});

export const newJobSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be atleast 5 characters long.",
  }),
  description: z.string().min(20, {
    message: "Description must be atleast 20 characters long.",
  }),
  companyName: z.string().min(5, {
    message: "Company Name must be atleast 5 characters long.",
  }),
  salary: z.string().min(5, {
    message: "Salary must be atleast 5 characters long.",
  }),
  currency: z.string({
    required_error: "Please select one category",
  }),
  location: z.string({
    required_error: "Please select one location type",
  }),
});

export type LoginUser = z.infer<typeof userLoginSchema>;
export type NewJob = z.infer<typeof newJobSchema>;
