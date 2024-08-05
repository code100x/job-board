import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import db from "@/lib/db";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log(user, account, profile, email, credentials);

      if (account?.provider === "google") {
        const { name, email, image } = user;

        if (!email) {
          return false;
        }

        const userExists = await db.user.findFirst({
          where: {
            email,
          },
        });

        if(userExists) {
            return true;
        }

        await db.user.create({
            data: {
                username: name ?? "Unknown User",
                email,
                userImage: image ?? "",
            }
        });

        return true;
      }

      return false;
    },
  },
});

export { handler as GET, handler as POST };
