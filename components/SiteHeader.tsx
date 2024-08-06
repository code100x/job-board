import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import MobileNav from "./Navbar/MobileNav";
import Navbar from "./Navbar/Navbar";
import { auth } from "@/auth";

export async function SiteHeader() {
  const session = await auth();

  return (
    <header className="container mx-auto px-4 py-2 flex h-16 items-center">
      {/* Navbar visible on screens larger than 'sm' */}
      <div className="hidden sm:flex flex-1 justify-center items-center">
        <Navbar session={session} />
      </div>

      {/* MobileNav visible on screens smaller than 'sm' */}
      <div className="sm:hidden absolute inset-x-0  transform -translate-y-1/2 flex justify-between px-4">
        <h3 className="text-xl bg-gradient-to-r from-indigo-600 via-violet-500 to-blue-700 bg-clip-text text-transparent font-black">
          100xJobs
        </h3>
        <MobileNav session={session} />
      </div>
    </header>
  );
}
