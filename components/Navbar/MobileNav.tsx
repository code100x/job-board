"use client";

import { useState } from "react";
import Link, { LinkProps } from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { signOut } from "next-auth/react";
import { ModeToggle } from "../ModeToggle";

const MobileNav = ({ session }: any) => {
  const [open, setOpen] = useState(false);

  const pathName = usePathname();

  const userRole = session?.user.role;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-10 px-0 sm:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Theme</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="flex flex-col justify-start gap-8 p-4"
      >
        <ModeToggle/>
        <div className="flex flex-col gap-1 text-md mt-8">
          <MobileLink onOpenChange={setOpen} href="/">
            Home
          </MobileLink>
          <MobileLink onOpenChange={setOpen} href="/jobs">
            Explore
          </MobileLink>
          {userRole === "ADMIN" ? (
            <MobileLink href="/jobs/manage">
              <p
                className={cn("cursor-pointer", {
                  "text-zinc-500": pathName === "/jobs/manage",
                })}
              >
                Manage
              </p>
            </MobileLink>
          ) : null}
        </div>
        {!session ? (
          <Link href="/login">
            <Button className="font-medium">Join Now</Button>
          </Link>
        ) : (
          <Button
            onClick={async () => {
              await signOut();
            }}
            variant="outline"
            className="font-medium rounded-md"
          >
            Sign Out
          </Button>
        )}
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
      className={cn(
        `text-foreground transition duration-300 mb-0 hover:bg-secondary p-2 pl-4 rounded-sm ${className}`,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
export default MobileNav;
