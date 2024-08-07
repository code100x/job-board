import { z } from "zod";

export const userLoginSchema = z.object({
<<<<<<< HEAD
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
  
=======
  email: z.string().email(),
  password: z.string().min(5, {
    message: "Password must be atleast 5 characters long",
  }),
>>>>>>> ef7acd5e2dc9a660f233907bebda64939c083201
});

// export const userRegisterSchema = z.object({
//   name: z.string().min(2, {
//     message: "Name must be at least 2 characters long",
//   }),
//   email: z.string().email("Invalid email address"),
//   password: z.string().min(6, "Password must be at least 6 characters long"),
  
// });

export type LoginUser = z.infer<typeof userLoginSchema>;