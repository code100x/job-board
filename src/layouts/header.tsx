'use client';
import { MobileNav } from '@/layouts/mobile-nav';
import { navbar } from '@/lib/constant/app.constant';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { NavItem } from '@/components/navitem';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { useState, useEffect } from 'react';

const CompanyLogo = () => {
  return (
    <div className="flex items-center gap-2">
      <Image
        src={'/main.png'}
        alt="100xJobs"
        width={30}
        height={30}
        className="rounded-full"
      />
      <h3 className="text-xl font-bold inline-flex bg-gradient-to-r from-[#63ADF7] to-[#296EE7] bg-[200%_auto] bg-clip-text leading-tight text-transparent dark:from-[#63ADF7]  dark:to-[#296EE7]">
        100xJobs
      </h3>
    </div>
  );
};

const Header = () => {
  const session = useSession();
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      const fadeStart = 0;
      const fadeEnd = windowHeight * 0.3;

      if (scrollPosition <= fadeStart) {
        setOpacity(1);
      } else if (scrollPosition >= fadeEnd) {
        setOpacity(0);
      } else {
        setOpacity(1 - (scrollPosition - fadeStart) / (fadeEnd - fadeStart));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className="sticky top-6 z-50 md:w-auto mx-auto w-full px-6 transition-opacity duration-300"
      style={{ opacity }}
    >
      <div className="container flex h-14 max-w-screen-xl items-center md:border-2 rounded-full border-border/40 sm:bg-none sm:bg-background/60 ">
        <Link href="/" className="p-2.5 mr-4">
          <CompanyLogo />
        </Link>

        <div className="grow flex justify-end sm:justify-between items-center gap-3">
          <nav className="py-1 rounded-full max-sm:hidden">
            <ul className="flex items-center gap-4 text-sm lg:gap-6">
              {navbar.map((item, index) => {
                if (session.status === 'loading') {
                  return <Skeleton className="h-4 w-[60px]" key={index} />;
                } else {
                  return <NavItem {...item} key={item.id} />;
                }
              })}
            </ul>
          </nav>
          <div className="sm:hidden flex justify-center">
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
