"use client";

import { BriefcaseIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { signOut } from "next-auth/react";
import JobEntryForm from "./job-entry-form";
import { Session } from "next-auth";

export default function Header({ session }: { session: Session }) {
  const user = session?.user;

  return (
    <header className="bg-background border-b px-4 md:px-6 flex items-center justify-between h-16 shadow">
      <Link href="/" className="flex items-center gap-2" prefetch={false}>
        <BriefcaseIcon className="w-6 h-6" />
        <span className="font-semibold text-lg">100xHire</span>
      </Link>

      <div className="flex items-center gap-2">
        <Button variant="destructive" size="sm" onClick={() => signOut()}>
          Log out
        </Button>

        {user.role === "ADMIN" && (
          <Sheet>
            <SheetTrigger asChild>
              <Button size="sm">Post Job</Button>
            </SheetTrigger>
            <SheetContent className="shadow-lg overflow-scroll">
              <div className="p-6 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Post a Job</h3>
                  <p className="text-muted-foreground">
                    Fill out the form below to post a new job listing.
                  </p>
                </div>
                <JobEntryForm />
              </div>
            </SheetContent>
          </Sheet>
        )}
      </div>
    </header>
  );
}
