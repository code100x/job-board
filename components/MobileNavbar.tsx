"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { logOutUser } from "@/actions/user";
import { Session } from "next-auth";
import { toast } from "./ui/use-toast";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AlignJustify } from "lucide-react";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
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
      <Sheet>
        <SheetTrigger>
          <AlignJustify />
        </SheetTrigger>
        <SheetContent side="right" className="w-64 bg-white p-6">
          <nav className="grid gap-4 text-gray-500 font-semibold tracking-tighter">
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
            {!session ? (
              <Link href="/login">
                <Button className="font-medium text-lg">Join Now</Button>
              </Link>
            ) : (
              <Button
                onClick={handleSignOut}
                variant="outline"
                className="font-medium rounded-md text-lg"
              >
                Sign Out
              </Button>
            )}
          </nav>
        </SheetContent>
      </Sheet>
    </nav>
  );
};
