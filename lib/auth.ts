import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/prisma/db";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!user || !user.email) {
        return false;
      }

      await prisma.user.upsert({
        where: {
          email: user.email
        },
        create: {
          email: user.email,
          name: user.name || "",
        },
        update: {
          name: user.name || "",
        }
      });

      return true;
    }
  },
  secret: process.env.NEXTAUTH_SECRET || "secret"
};