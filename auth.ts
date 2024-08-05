import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async signIn({ user, account }) {
      const exisitngUser = await prisma.user.findUnique({
        where: {
          id: user.id,
        },
      });

      if (!exisitngUser) return false;

      return true;
    },

    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role;
      }

      return session;
    },

    async jwt({ token }) {
      if (!token.sub) return token;

      const exisitngUser = await prisma.user.findUnique({
        where: {
          id: token.sub,
        },
      });

      if (!exisitngUser) return token;

      token.role = exisitngUser.role;

      return token;
    },
  },

  ...authConfig,
});
