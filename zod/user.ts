import { z } from "zod";

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5, {
    message: "Password must be atleast 5 characters long",
  }),
});

export const userSignupSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});


export type LoginUser = z.infer<typeof userLoginSchema>;
