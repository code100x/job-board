import { DefaultSession, User as DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

type Role = "ADMIN" | "USER";

declare module "next-auth" {
  interface Session {
    user: {
      role?: Role;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: Role;
  }
}

type SAPayload = {
  status: "success" | "error";
  message?: string;
};

type LoginAction = {
  email: string;
  password: string;
};
