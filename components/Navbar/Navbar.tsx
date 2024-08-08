"use client";
import Link from "next/link";
import { logOutUser } from "@/actions/user";
import { Session } from "next-auth";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserImage from "@/components/UserImage";
import { signOut } from "next-auth/react";
import { Icons } from "../Icons";
import { useTheme } from "next-themes";
import { Logo } from "../100xLogo";

type NavbarProps = {
  session: Session | null;
};

const Navbar = ({ session }: NavbarProps) => {
  const router = useRouter();
  const pathName = usePathname();
  const { theme, setTheme } = useTheme();

  const navItems = [
    {
      name: "Home",
      route: "/",
    },
    {
      name: "Jobs",
      route: "/jobs",
    },
    {
      name: "Contact Us",
      route: "/contact-us",
    },
  ];

  const dropDownData = [
    {
      name: "Profile",
      icon: <Icons.userRound className="h-4 w-4" />,
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
    <nav className="w-full z-50 flex items-center justify-between mx-16 h-14 border shadow-[0 0 10px hsl(var(--blue) / 1)] border-secondary rounded-lg px-2 transition-all backdrop-blur-lg bg-background">
      <div className="flex justify-center items-center gap-10 ml-2">
        <Logo className="text-xl" />
      </div>

      <div className="border border-secondary min-h-fit rounded-full flex items-center p-2 px-4 text-sm justify-center w-fit items-center gap-5 text-gray-500 font-semibold tracking-tighter">
        {navItems.map((item) => {
          return (
            <Link key={item.name} href={item.route}>
              <p
                className={cn("cursor-pointer min-w-max", {
                  "text-foreground": pathName === item.route,
                  "hover:text-foreground hover:underline":
                    pathName != item.route,
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
              className={cn(
                "cursor-pointer hover:text-gray-900 hover:underline",
                {
                  "text-gray-900": pathName === "/jobs/manage",
                }
              )}
            >
              Manage
            </p>
          </Link>
        ) : null}
      </div>

      <div className="flex justify-center items-center gap-2">
        {/* Theme Toggle */}
        {!session && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Icons.sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Icons.moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {/* User Profile Nav */}
        {session && session?.user && (
          <DropdownMenu>
            <DropdownMenuTrigger className="w-[2rem] flex items-center p-[0.2rem]  justify-center h-[2rem]">
              {!session?.user.image ? (
                <div className="p-1 border-2 rounded-md">
                  <Icons.userRound className="h-6 w-6" />
                </div>
              ) : (
                <UserImage image={session?.user.image} />
              )}
            </DropdownMenuTrigger>

            <DropdownMenuContent className="!w-[15rem] dark:shadow-[#030712] translate-y-8 scale-110 -translate-x-10 shadow-lg bg-background">
              <DropdownMenuLabel className="flex gap-4 items-center">
                <div className="!w-[2rem] flex items-center p-[0.2rem]  justify-center !h-[2rem]">
                  {!session?.user.image ? (
                    <div className="p-1 border-2 rounded-full border-[#1a1a1a]">
                      <Icons.userRound className="h-6 w-6" />
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

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex justify-start items-center gap-2 p-2 w-full rounded-sm"
                    size={"sm"}
                  >
                    {theme === "dark" ? (
                      <Icons.sun className="h-4 w-4" />
                    ) : (
                      <Icons.moon className="h-4 w-4" />
                    )}
                    <span>Toggle theme</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("system")}>
                    System
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
                  <Icons.logout className="h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {!session && (
          <Link href="/login">
            <Button size={"sm"} className="font-medium">
              Join Now
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
