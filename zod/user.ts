import { z } from "zod";

export const userLoginSchema = z.object({
  email: z.string().email({
    message:"Invalid required"
  }),
  password: z.string().min(2,{
    message:"Password is required"
  }),
});

