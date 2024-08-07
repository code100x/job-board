import { z } from "zod";

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5, {
    message: "Password must be atleast 5 characters long",
  }),
});

export type LoginUser = z.infer<typeof userLoginSchema>;
