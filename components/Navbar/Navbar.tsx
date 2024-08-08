"use client";
import Link from "next/link";
import { logOutUser } from "@/actions/user";
import { Session } from "next-auth";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {toast} from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import UserImage from "@/components/UserImage";
import {LogOut, UserRound} from "lucide-react";
import {signOut} from "next-auth/react";

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

  const dropDownData = [
    {
      name: "Profile",
      icon: <UserRound size={15} />,
      href: "/profile",
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
    <nav className="w-3/6 flex items-center justify-between h-14 border-t shadow border-gray-150 rounded-lg px-3 transition-all backdrop-blur-lg bg-background/50">
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

      {session && session?.user && (
          <DropdownMenu>
            <DropdownMenuTrigger className="w-[2rem] flex items-center p-[0.2rem]  justify-center h-[2rem]">
              {!session?.user.image ? (
                  <div className="p-1 border-2 rounded-md">
                    <UserRound />
                  </div>
              ) : (
                  <UserImage image={session?.user.image} />
              )}
            </DropdownMenuTrigger>

            <DropdownMenuContent className="!w-[15rem] dark:shadow-[#030712] translate-y-8 scale-110 -translate-x-10 shadow-lg bg-white">
              <DropdownMenuLabel className="flex gap-4 items-center">
                <div className="!w-[2rem] flex items-center p-[0.2rem]  justify-center !h-[2rem]">
                  {!session?.user.image ? (
                      <div className="p-1 border-2 rounded-full border-[#1a1a1a]">
                        <UserRound />
                      </div>
                  ) : (
                      <UserImage image={session?.user.image} />
                  )}
                </div>

                <div className="flex flex-col">
                  <span className="max-w-[200px]">{session?.user?.name}</span>
                  <span className="text-[0.8rem] max-w-[200px] text-gray-400">
                    {session?.user?.email}
                  </span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              {dropDownData.map((item, index) => {
                return (
                    <DropdownMenuItem
                        className="flex gap-2 focus:border-gray-500 cursor-pointer"
                        onClick={() => router.push("/profile")}
                        key={index}
                    >
                      <span>{item.icon}</span>
                      <span>{item.name}</span>
                    </DropdownMenuItem>
                );
              })}
              <DropdownMenuSeparator />
              {session?.user && (
                  <DropdownMenuItem
                      onClick={async () => {
                        await signOut();
                        router.push("/");
                      }}
                      className="flex gap-2 cursor-pointer"
                  >
                    <LogOut size={15} />
                    Logout
                  </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
      )}
      {!session && (
          <Link href="/login">
            <Button className="font-medium">Join Now</Button>
          </Link>
      )}
    </nav>
  );
};

export default Navbar;
