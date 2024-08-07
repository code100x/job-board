"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { logOutUser } from "@/actions/user";
import { Session } from "next-auth";
import { toast } from "./ui/use-toast";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import NewJobModal from "./NewJobModal";

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

  return (
    <nav className="relative w-full flex items-center justify-between h-14 border-t shadow border-gray-150 rounded-lg px-3 transition-all backdrop-blur-lg bg-background/50">
      <div className="flex justify-center items-center gap-10">
        <h3 className="text-xl bg-gradient-to-r from-indigo-600 via-violet-500 to-blue-700 bg-clip-text text-transparent font-black hidden md:block">
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
            <div className="flex items-center justify-between gap-4">
              <Link href="/manage">
                <p
                  className={cn("cursor-pointer hover:text-gray-900", {
                    "text-gray-900": pathName === "/manage",
                  })}
                >
                  Manage
                </p>
              </Link>
              <NewJobModal />
            </div>
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
  );
};

export default Navbar;
