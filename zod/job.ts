import { z } from "zod";

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
  status: z.string({
    required_error:"Please select one",
  }),
});

export const UpdateJobSchema = z.object({
  title: z.string().min(5, {
    message: "Title must contain atleast 5 characters long.",
  }),
  description: z.string().min(20, {
    message: "Description must contain atleast 20 characters long.",
  }),
  companyName: z.string().min(5, {
    message: "Company Name must contain atleast 5 characters long.",
  }),
  salary: z.string().min(5, {
    message: "Salary must contain atleast 5 characters long.",
  }),
  currency: z.string({
    required_error: "Please select one category",
  }),
  location: z.string({
    required_error: "Please select one location type",
  }),
  status: z.string({
    required_error:"Please select one",
  }),
  id:z.string({
    message:"Invalid id"
  }),
});

export type NewJob = z.infer<typeof newJobSchema>;
export type UpdateJob = z.infer<typeof UpdateJobSchema>;
