import { z } from "zod";

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(2),
});

export type LoginUser = z.infer<typeof userLoginSchema>;
