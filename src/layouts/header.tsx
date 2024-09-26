'use client';
import { MobileNav } from '@/layouts/mobile-nav';
import {
  adminNavbar,
  nonUserNavbar,
  userNavbar,
} from '@/lib/constant/app.constant';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { NavItem } from '@/components/navitem';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { LogOutIcon, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { ADMIN_ROLE } from '@/config/app.config';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
export const CompanyLogo = () => {
  return (
    <div className="flex items-center gap-2">
      <Image
        src={'/main.svg'}
        alt="100xJobs"
        width={30}
        height={30}
        className="rounded"
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
  const [mounted, setMounted] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <nav className="fixed w-full z-50 backdrop-blur-md border">
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
                  ? session.data?.user.role === ADMIN_ROLE
                    ? adminNavbar.map((item) => (
                        <NavItem {...item} key={item.id} />
                      ))
                    : userNavbar.map((item) => (
                        <NavItem {...item} key={item.id} />
                      ))
                  : nonUserNavbar.map((item) => (
                      <NavItem {...item} key={item.id} />
                    ))}
              {session.status === 'authenticated' ? (
                <li>
                  <Button
                    className="rounded-lg"
                    size="sm"
                    variant="destructive"
                  >
                    <LogOutIcon
                      className="w-4 h-4"
                      onClick={() => {
                        signOut();
                      }}
                    />
                  </Button>
                </li>
              ) : null}
            </ul>
            <div className="flex items-center">
              {mounted && (
                <button
                  className="border p-2.5 rounded-lg text-foreground/60 hover:dark:bg-[#191919] hover:bg-gray-100 md:mx-4 outline-none"
                  onClick={toggleTheme}
                >
                  {theme === 'dark' ? (
                    <Moon className="w-4 h-4" />
                  ) : (
                    <Sun className="w-4 h-4" />
                  )}
                </button>
              )}

              {session.status !== 'loading' && !session.data?.user && (
                <Link href={'/create'}>
                  <button className="rounded-lg p-2 bg-[#3259E8] hover:bg-[#3e63e9] text-white font-medium max-sm:hidden">
                    Post a job
                  </button>
                </Link>
              )}

              <div className="md:hidden flex justify-center ml-3">
                <MobileNav />
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="h-[72px] print:hidden"></div>
    </>
  );
};

export default Header;
