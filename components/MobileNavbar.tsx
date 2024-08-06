"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { logOutUser } from "@/actions/user";
import { Session } from "next-auth";
import { toast } from "./ui/use-toast";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { AlignJustify } from "lucide-react";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
type NavbarProps = {
  session: Session | null;
};
export const MobileNavbar = ({ session }: NavbarProps) => {
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
  return (
    <nav className="w-[90vw] flex items-center justify-between h-14 border-t shadow border-gray-150 rounded-lg px-3 transition-all backdrop-blur-lg bg-background/50">
      <h3 className="text-xl bg-gradient-to-r from-indigo-600 via-violet-500 to-blue-700 bg-clip-text text-transparent font-black">
        100xJobs
      </h3>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <AlignJustify />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-4 mt-2 text-gray-500 z-1000 bg-white rounded-xl  border-black shadow-md bo flex flex-col py-4 px-2  w-fit  justify-evenly gap-4 text-base font-semibold">
          {navItems.map((item) => {
            return (
              <DropdownMenuItem key={item.name} className="cursor-pointer font-medium rounded-md flex justify-center items-center">
                <Link href={item.route}>
                  <p
                    className={cn("cursor-pointer hover:text-gray-900", {
                      "text-gray-900": pathName === item.route,
                    })}
                  >
                    {item.name}
                  </p>
                </Link>
              </DropdownMenuItem>
            );
          })}
          {userRole === "ADMIN" ? (
            <DropdownMenuItem className="cursor-pointer font-medium rounded-md  flex justify-center items-center ">
              <Link href="/jobs/manage">
                <p
                  className={cn("cursor-pointer hover:text-gray-900", {
                    "text-gray-900": pathName === "/jobs/manage",
                  })}
                >
                  Manage
                </p>
              </Link>
            </DropdownMenuItem>
          ) : null}
          {!session ? (
            <DropdownMenuItem className="cursor-pointer font-medium rounded-md flex justify-center items-center">
              <Link href="/login">
                <Button className="font-medium">Join Now</Button>
              </Link>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              onClick={handleSignOut}
              className="cursor-pointer flex justify-center font-medium rounded-md items-center"
            >
              <Button
                onClick={handleSignOut}
                variant="outline"
                className="font-medium rounded-md"
              >
                Sign Out
              </Button>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};
