import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { userLoginSchema } from "./zod/user";

export default {
  providers: [
    Credentials({
      authorize: async (credentials, req) => {
        const validatedFields = await userLoginSchema.parseAsync(credentials);

        const { email, password } = validatedFields;

        const user = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });

        if (!user || !user.password) return null;

        const passwordsMatch = await bcrypt.compare(password, user.password);

        if (!passwordsMatch) return null;

        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
