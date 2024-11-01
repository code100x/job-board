'use client';
import { NavItem } from '@/components/navitem';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { ADMIN_ROLE, HR_ROLE } from '@/config/app.config';
import { MobileNav } from '@/layouts/mobile-nav';
import {
  adminNavbar,
  nonUserNavbar,
  userNavbar,
} from '@/lib/constant/app.constant';
import icons from '@/lib/icons';
import { getNameInitials } from '@/lib/utils';
import { Moon, Sun } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const CompanyLogo = () => {
  return (
    <div className="flex items-center gap-2">
      <Image
        src={'/main.svg'}
        alt="100xJobs logo"
        width={30}
        height={30}
        className="rounded"
        priority
      />
      <h3 className="text-xl font-bold">
        100x<span className="text-blue-700">Jobs</span>
      </h3>
    </div>
  );
};

const Header = () => {
  const session = useSession();
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <nav className="fixed w-full z-50 backdrop-blur-lg border">
        <div className="flex h-[72px] w-full items-center justify-between lg:px-20 px-3 shadow-sm">
          <Link href="/" className="p-2.5">
            <CompanyLogo />
          </Link>
          <div className="flex items-center">
            <ul className="md:flex items-center gap-4 text-sm lg:gap-6 hidden mx-4">
              {session.status === 'loading'
                ? nonUserNavbar.map((_, index) => (
                    <Skeleton className="h-4 w-[60px]" key={index} />
                  ))
                : session.data?.user
                  ? session.data?.user.role === ADMIN_ROLE ||
                    session.data?.user.role === HR_ROLE
                    ? adminNavbar.map((item) => (
                        <NavItem {...item} key={item.id} />
                      ))
                    : userNavbar.map((item) => (
                        <NavItem {...item} key={item.id} />
                      ))
                  : nonUserNavbar.map((item) => (
                      <NavItem {...item} key={item.id} />
                    ))}
            </ul>
            <div className="flex items-center">
              {mounted && (
                <button
                  className="border p-2.5 rounded-lg text-foreground/60 hover:dark:bg-[#191919] hover:bg-gray-100 md:mx-4 outline-none"
                  onClick={toggleTheme}
                  aria-label="theme"
                >
                  {theme === 'dark' ? (
                    <Moon className="w-4 h-4" />
                  ) : (
                    <Sun className="w-4 h-4" />
                  )}
                </button>
              )}
            </div>
            <div className="hidden md:block">
              {session.status === 'loading' ? (
                <Skeleton className="h-8 w-8 rounded-full" />
              ) : session.status === 'authenticated' ? (
                <>
                  <DropdownMenu open={open} onOpenChange={setOpen}>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="relative h-8 w-8 rounded-full"
                        aria-label="avatar"
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={
                              session.data.user.image
                                ? session.data.user.image
                                : 'hello'
                            }
                          />
                          {/* <Image
                            src={session.data.user.image}
                            alt={session.data.user.name}
                            width={32}
                            height={32}
                            className="rounded-full"
                          /> */}

                          <AvatarFallback>
                            {getNameInitials(session.data.user.name)}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-56"
                      align="end"
                      forceMount
                    >
                      <DropdownMenuItem>
                        <icons.profile className="mr-2 h-4 w-4" />
                        <Link
                          className="w-full"
                          href={'/profile/' + session.data.user.id}
                        >
                          Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => {
                          signOut();
                        }}
                      >
                        <icons.logout className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <div>
                  <Button
                    className="rounded-lg"
                    size="sm"
                    variant="default"
                    onClick={() => {
                      router.push('/signin');
                    }}
                    aria-label="login"
                  >
                    Login
                  </Button>
                </div>
              )}
            </div>

            <div className="md:hidden flex justify-center ml-3">
              <MobileNav />
            </div>
          </div>
        </div>
      </nav>
      <div className="h-[72px] print:hidden"></div>
    </>
  );
};

export default Header;
