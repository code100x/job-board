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
    message: "Please select salary range.",
  }),
  currency: z.string().min(2, {
    message: "Please select one category",
  }),
  location: z.string().min(4, {
    message: "Please select one location",
  }),
  state: z.string().optional(),
  country: z.string().optional(),
});



export type NewJob = z.infer<typeof newJobSchema>;
