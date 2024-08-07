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
import {Icon, LogOut, UserRound} from "lucide-react";
import {signOut} from "next-auth/react";
import { Icons } from "../Icons";
import { useTheme } from "next-themes";

type NavbarProps = {
  session: Session | null;
};

const Navbar = ({ session }: NavbarProps) => {
  const router = useRouter();
  const pathName = usePathname();
  const { theme, setTheme } = useTheme()

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
    <nav className="w-full flex items-center justify-between h-14 border shadow-[0 0 10px hsl(var(--blue) / 1)] border-secondary rounded-lg px-2 transition-all backdrop-blur-lg bg-background">
      <div className="flex justify-center items-center gap-10 ml-2">
        <h3 className="animate-text-gradient text-xl font-bold inline-flex bg-gradient-to-r from-neutral-900 via-slate-500 to-neutral-400 bg-[200%_auto] bg-clip-text leading-tight text-transparent dark:from-neutral-100 dark:via-slate-600 dark:to-neutral-400">
          100xJobs
        </h3>
      </div>

      <div className=" border border-secondary rounded-full flex items-center p-2 px-4 text-sm justify-center w-fit items-center gap-5 text-gray-500 font-semibold tracking-tighter">
        {navItems.map((item) => {
          return (
            <Link key={item.name} href={item.route}>
              <p
                className={cn("cursor-pointer", {
                  "text-foreground": pathName === item.route,
                  "hover:text-foreground hover:underline": pathName != item.route
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
              className={cn("cursor-pointer hover:text-gray-900 hover:underline", {
                "text-gray-900": pathName === "/jobs/manage",
              })}
            >
              Manage
            </p>
          </Link>
        ) : null}
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
      <div className="flex justify-center items-center gap-4">
        {/* {
          theme === 'light' ?
          <Icons.moon onClick={() => setTheme("dark")} className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          :
          <Icons.sun onClick={() => setTheme("light")} className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        } */}
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
        {!session && (
            <Link href="/login">
              <Button size={'sm'} className="font-medium">Join Now</Button>
            </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
