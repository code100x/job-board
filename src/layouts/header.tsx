'use client';
import { MobileNav } from '@/layouts/mobile-nav';
import { navbar } from '@/lib/constant/app.constant';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { NavItem } from '@/components/navitem';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { ModeToggle } from '@/components/ui/theme-toggle';
import { Button } from '@/components/ui/button';

export const CompanyLogo = () => {
  return (
    <div className="flex items-center gap-2">
      <Image
        src={'/main.png'}
        alt="100xJobs"
        width={30}
        height={30}
        className="rounded-full"
      />
      <h3 className="text-xl font-bold">
        100x<span className="text-blue-700">Jobs</span>
      </h3>
    </div>
  );
};

const Header = () => {
  const session = useSession();

  return (
    <div>
      <header className="fixed z-50 mx-auto transition-opacity border-b duration-300 px-4 sm:px-16 flex justify-between w-screen items-center  bg-background/60  sm:bg-none sm:bg-background/60   h-14">
        <Link href="/" className="p-2.5 mr-4">
          <CompanyLogo />
        </Link>

        <div className="items-center gap-3">
          <nav className="py-1 rounded-full max-sm:hidden">
            <ul className="flex items-center gap-4 text-sm lg:gap-6">
              {navbar.map((item, index) => {
                if (session.status === 'loading') {
                  return <Skeleton className="h-4 w-[60px]" key={index} />;
                } else {
                  return <NavItem {...item} key={item.id} />;
                }
              })}
              <ModeToggle />
              <Link href={'/create'}>
                <Button className=" rounded bg-blue-800 dark:text-white">
                  Post a Job
                </Button>
              </Link>
            </ul>
          </nav>
          <div className="sm:hidden flex justify-center">
            <MobileNav />
          </div>
        </div>
      </header>
      <div className="h-16 print:hidden"></div>
    </div>
  );
};

export default Header;
