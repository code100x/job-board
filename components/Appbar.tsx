"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";

export const Appbar = () => {
  const session = useSession();
  return (
    <div className="border-b py-2 px-4 flex justify-between items-center">
      <div className="text-4xl p-3 font-bold">100xJobs</div>
      <div>
        {session.data?.user ? (
            <>
            <span className="font-bold mr-4">{session.data.user.name}</span>
          <Button onClick={() => signOut()}>Sign Out</Button>
            </>
        ) : (
          <Button onClick={() => signIn()}>Sign In</Button>
        )}
      </div>
    </div>
  );
};
