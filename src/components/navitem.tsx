'use client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const NavItem = ({
  path,
  label,
  roleRequired,
  isPrivate,
}: {
  path: string;
  label: string;
  roleRequired?: string;
  isPrivate?: boolean;
}) => {
  const session = useSession();
  const pathname = usePathname();
  if (session.status === 'loading') {
    return;
  }
  if (!session.data?.user && isPrivate) {
    return;
  }
  if (session && roleRequired && session.data?.user.role !== roleRequired) {
    return;
  }

  return (
    <li>
      <Link
        href={path}
        aria-selected={pathname === path}
        className="transition-colors hover:text-foreground/80 text-foreground/60"
      >
        {label}
      </Link>
    </li>
  );
};
