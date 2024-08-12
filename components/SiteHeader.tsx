import MobileNav from "./Navbar/MobileNav";
import Navbar from "./Navbar/Navbar";
import { auth } from "@/auth";

export async function SiteHeader() {
  const session = await auth();

  return (
    <header className="container mx-auto p-0 flex h-16 items-center">
      {/* Navbar visible on screens larger than 'sm' */}
      <div className="hidden sm:flex flex-1 justify-center items-center">
        <Navbar session={session} />
      </div>

      {/* MobileNav visible on screens smaller than 'sm' */}
      <div className="sm:hidden flex justify-between items-center w-full">
        <h3 className="animate-text-gradient text-xl font-bold inline-flex bg-gradient-to-r from-neutral-900 via-slate-500 to-neutral-500 bg-[200%_auto] bg-clip-text leading-tight text-transparent dark:from-neutral-100 dark:via-slate-400 dark:to-neutral-400">
          100xJobs
        </h3>
        <MobileNav session={session} />
      </div>
    </header>
  );
}
