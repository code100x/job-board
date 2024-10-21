'use client';

import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

import Link from 'next/link';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';

import { userProfileNavbar } from '@/lib/constant/app.constant';
import { MenuIcon, XIcon } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="flex flex-col justify-start md:h-full items-start md:px-2 z-[4] md:border md:rounded-xl md:pt-6 max-md:absolute right-5">
      <DesktopSidebar />
      <MobileSidebar />
    </div>
  );
};

const DesktopSidebar = () => {
  return (
    <div className="md:flex hidden w-56 h-full p-2">
      <div className="flex flex-col w-full">
        <SidebarNavs />
      </div>
    </div>
  );
};

const MobileSidebar = () => {
  return (
    <div className="md:hidden h-full flex flex-col z-[3]">
      <Sheet>
        <SheetTrigger>
          <MenuIcon />
        </SheetTrigger>
        <SheetContent className="md:hidden">
          <SheetClose className="absolute top-3 right-3">
            <XIcon />
          </SheetClose>
          <div className="flex flex-col w-full md:hidden mt-12">
            <SidebarNavs />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

const SidebarNavs = () => {
  return (
    <div className="flex w-full flex-col text-slate-700 dark:text-slate-300">
      <div className="flex flex-col justify-start items-start gap-3 mb-2">
        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
          User Settings
        </span>
        <Separator />
      </div>
      {userProfileNavbar.map((nav) => (
        <NavItem {...nav} key={nav.id} />
      ))}
    </div>
  );
};

const NavItem = ({ path, label }: { path: string; label: string }) => {
  const session = useSession();
  const pathname = usePathname();
  if (session.status === 'loading') return;
  if (!session.data?.user) return;
  if (!session) return;
  return (
    <Link
      href={path}
      aria-selected={pathname === path}
      className={`flex justify-start items-center gap-2 hover:bg-slate-200 hover:border-l-blue-600 hover:border-l-2 dark:hover:bg-slate-800 px-3 py-2 transition-colors hover:text-foreground/80 font-medium text-sm  ${pathname === path && 'bg-slate-200 border-l-blue-500 border-l-2 dark:bg-slate-800'}`}
    >
      {label}
    </Link>
  );
};

export default Sidebar;
