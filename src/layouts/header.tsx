'use client';
import { MobileNav } from '@/layouts/mobile-nav';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/ui/theme-toggle';
import APP_PATHS from '@/config/path.config';
import { navbar } from '@/lib/constant/app.constant';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { ProfileMenu } from '@/components/profile-menu';
import { NavItem } from '@/components/navitem';

const CompanyLogo = () => {
  return (
    <h3 className="text-xl font-bold inline-flex bg-gradient-to-r from-neutral-900 via-slate-500 to-neutral-500 bg-[200%_auto] bg-clip-text leading-tight text-transparent dark:from-neutral-100 dark:via-slate-400 dark:to-neutral-400">
      100xJobs
    </h3>
  );
};

const Header = () => {
  const session = useSession();

  return (
    <header className="sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-xl items-center">
        <Link href="/" className="p-2.5 mr-4">
          <CompanyLogo />
        </Link>

        <div className="grow flex justify-end sm:justify-between items-center">
          <nav className="py-1 rounded-full max-sm:hidden">
            <ul className="flex items-center gap-4 text-sm lg:gap-6">
              {navbar.map((item) => (
                <NavItem {...item} key={item.id} />
              ))}
            </ul>
          </nav>

          <div className="max-sm:hidden flex text-sm items-center gap-3 ">
            {session.status !== 'loading' && !session.data?.user && (
              <>
                <Link
                  href={APP_PATHS.SIGNIN}
                  className="transition-colors hover:text-foreground/80 text-foreground/60"
                >
                  Login
                </Link>
                <Button className="text-xs" size={'sm'}>
                  <Link href={APP_PATHS.SIGNUP}>Start Free</Link>
                </Button>
              </>
            )}
            {session.status !== 'loading' && session.data?.user && (
              <ProfileMenu />
            )}
            <ModeToggle />
          </div>
          <div className="sm:hidden">
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
