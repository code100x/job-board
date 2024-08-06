"use client";

import { useState } from "react";
import Link, { LinkProps } from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { logOutUser } from "@/actions/user";
import { Session } from "next-auth";
import { toast } from "../ui/use-toast";
import { usePathname, useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
type NavbarProps = {
  session: Session | null;
};

const MobileNav = ({ session }: NavbarProps) => {
  const [open, setOpen] = useState(false);
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
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-10 px-0 sm:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Theme</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <MobileLink
          onOpenChange={setOpen}
          href="/"
          className="flex items-center"
        >
          <h3 className="text-xl bg-gradient-to-r from-indigo-600 via-violet-500 to-blue-700 bg-clip-text text-transparent font-black">
            100xJobs
          </h3>{" "}
        </MobileLink>
        <div className="flex flex-col gap-3 mt-3">
          <MobileLink onOpenChange={setOpen} href="/">
            Home
          </MobileLink>
          <MobileLink onOpenChange={setOpen} href="/explore">
            Explore
          </MobileLink>
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
      </SheetContent>
    </Sheet>
  );
};

interface MobileLinkProps extends LinkProps {
  children: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  children,
  className,
  ...props
}: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={className}
      {...props}
    >
      {children}
    </Link>
  );
}
export default MobileNav;
