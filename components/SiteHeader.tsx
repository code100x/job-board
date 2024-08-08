import { Logo } from "./100xLogo";
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
          <div className="sm:hidden mx-8 flex justify-between items-center w-full">
            <Logo/>
            <MobileNav session={session} />
          </div>
        </header>
  );
}
