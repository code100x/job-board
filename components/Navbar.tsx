"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { logOutUser } from "@/actions/user";
import { Session } from "next-auth";
import { toast } from "./ui/use-toast";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { MenuIcon, X, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
type NavbarProps = {
  session: Session | null;
};

const Navbar = ({ session }: NavbarProps) => {
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

  const userRole = session?.user.role;

  {
    /*TODO: Mobile Screen  */
  }

  const [IsOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!IsOpen);
  };

  // to stop scrolling when clicking on hamburger Menu

  useEffect(() => {
    document.body.style.overflow = IsOpen ? "hidden" : "auto";
  }, [IsOpen]);

  return (
    <>
      <div className="flex flex-col md:hidden border-b w-full relative">
        <div className="flex justify-between items-center p-4">
          <h3 className="text-xl bg-gradient-to-r from-indigo-600 via-violet-500 to-blue-700 bg-clip-text text-transparent font-black">
            100xJobs
          </h3>
          <div className="flex md:hidden">
            {!IsOpen ? (
              <MenuIcon className="w-8 h-8" onClick={toggle} />
            ) : (
              <XIcon className="w-8 h-8" onClick={toggle} />
            )}
          </div>
        </div>

        <motion.div
          className={`mobile-navbar ${IsOpen ? "block" : "hidden"}`}
          initial={{ opacity: 0, y: "-100%" }}
          animate={{ opacity: IsOpen ? 1 : 0, y: IsOpen ? 0 : "-100%" }}
          transition={{ duration: 0.3 }}
        >
          <div className=" relative">
            <div className="flex flex-col  w-full items-center justify-center text-lg font-medium p-4 space-y-2 bg-gray-50 absolute z-9999 ">
              <button className="w-full text-left">
                {navItems.map((item) => (
                  <Link key={item.name} href={item.route}>
                    <p
                      className={cn("cursor-pointer hover:text-gray-900", {
                        "text-gray-900": pathName === item.route,
                      })}
                    >
                      {item.name}
                    </p>
                  </Link>
                ))}

                {!session ? (
                  <Link href="/login">
                    <Button className="font-medium p-4 mt-12  ">
                      Join Now
                    </Button>
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
              </button>
              {userRole === "ADMIN" ? (
                <Link href="/jobs/manage">
                  <p
                    className={cn("cursor-pointer hover:text-gray-900", {
                      "text-gray-900": pathName === "/jobs/manage",
                    })}
                  >
                    Manage
                  </p>
                </Link>
              ) : null}
            </div>
          </div>
        </motion.div>
      </div>

      <nav className=" hidden  w-3/6 md:flex items-center justify-between h-14 border-t shadow border-gray-150 rounded-lg px-3 transition-all backdrop-blur-lg bg-background/50">
        <div className="flex justify-center items-center gap-10">
          <h3 className="text-xl bg-gradient-to-r from-indigo-600 via-violet-500 to-blue-700 bg-clip-text text-transparent font-black">
            100xJobs
          </h3>

          <div className="flex justify-center items-center gap-5 text-gray-500 font-semibold tracking-tighter">
            {navItems.map((item) => {
              return (
                <Link key={item.name} href={item.route}>
                  <p
                    className={cn("cursor-pointer hover:text-gray-900", {
                      "text-gray-900": pathName === item.route,
                    })}
                  >
                    {item.name}
                  </p>
                </Link>
              );
            })}

            {userRole === "ADMIN" ? (
              <Link href="/jobs/manage">
                <p
                  className={cn("cursor-pointer hover:text-gray-900", {
                    "text-gray-900": pathName === "/jobs/manage",
                  })}
                >
                  Manage
                </p>
              </Link>
            ) : null}
          </div>
        </div>

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
      </nav>
    </>
  );
};

export default Navbar;
