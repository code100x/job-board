import { z } from "zod";

export const userLoginSchema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
  
});

// export const userRegisterSchema = z.object({
//   name: z.string().min(2, {
//     message: "Name must be at least 2 characters long",
//   }),
//   email: z.string().email("Invalid email address"),
//   password: z.string().min(6, "Password must be at least 6 characters long"),
  
// });

export type LoginUser = z.infer<typeof userLoginSchema>;