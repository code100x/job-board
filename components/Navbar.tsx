"use client";
import Link from "next/link";
import { useState } from "react";
import { Button } from "./ui/button";
import { logOutUser } from "@/actions/user";
import { Session } from "next-auth";
import { toast } from "./ui/use-toast";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

type NavbarProps = {
  session: Session | null;
};

const Navbar = ({ session }: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathName = usePathname();

  const navItems = [
    {
      name: "Home",
      route: "/",
    },
    {
      name: "Explore",
      route: "/jobs",
    },
  ];

  const handleSignOut = async () => {
    const response = await logOutUser();

    if (response?.status !== "success") {
      toast({
        variant: "destructive",
        title: response?.message,
      });
      return;
    }

    router.push("/");
    router.refresh();
  };

  const handleLogoClick = () => {
    router.push("/");
    router.refresh();
  };

  const userRole = session?.user.role;

  return (
    <nav className="w-full bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h3
              className="text-2xl bg-gradient-to-r from-indigo-600 via-violet-500 to-blue-700 bg-clip-text text-transparent font-black cursor-pointer"
              onClick={handleLogoClick}
            >
              100xJobs
            </h3>
          </div>
          <div className="hidden md:flex items-center space-x-10">
            {navItems.map((item) => (
              <Link key={item.name} href={item.route}>
                <p
                  className={cn("cursor-pointer hover:text-gray-900 text-lg font-medium", {
                    "text-gray-900": pathName === item.route,
                  })}
                >
                  {item.name}
                </p>
              </Link>
            ))}
            {userRole === "ADMIN" && (
              <Link href="/jobs/manage">
                <p
                  className={cn("cursor-pointer hover:text-gray-900 text-lg font-medium", {
                    "text-gray-900": pathName === "/jobs/manage",
                  })}
                >
                  Manage
                </p>
              </Link>
            )}
            {!session ? (
              <Link href="/login">
                <Button className="font-medium">Join Now</Button>
              </Link>
            ) : (
              <Button
                onClick={handleSignOut}
                variant="outline"
                className="font-medium rounded-md"
              >
                Sign Out
              </Button>
            )}
          </div>
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link key={item.name} href={item.route}>
                <p
                  className={cn(
                    "block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100",
                    {
                      "bg-gray-100": pathName === item.route,
                    }
                  )}
                >
                  {item.name}
                </p>
              </Link>
            ))}
            {userRole === "ADMIN" && (
              <Link href="/jobs/manage">
                <p
                  className={cn(
                    "block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100",
                    {
                      "bg-gray-100": pathName === "/jobs/manage",
                    }
                  )}
                >
                  Manage
                </p>
              </Link>
            )}
            {!session ? (
              <Link href="/login">
                <p className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">
                  Join Now
                </p>
              </Link>
            ) : (
              <button
                onClick={handleSignOut}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
