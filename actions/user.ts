"use server";
// import { signIn, signOut } from "@/auth";

import { userLoginSchema } from "@/zod/user";
import { prisma } from "@/lib/db";
import { LoginAction, SAPayload } from "@/types";
import { signIn, signOut } from "next-auth/react";



export const logOutUser = async (): Promise<SAPayload> => {
  try {
    await signOut({ redirect: false });
    return { status: "success", message: "Logout Successful" };
  } catch (error) {
    return { status: "error", message: "Internal Server Error" };
  }
};
