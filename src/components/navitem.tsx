import { options } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import Link from 'next/link';

export const NavItem = async ({
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
  const session = await getServerSession(options);

  if (!session?.user.role.length && isPrivate) {
    return;
  }
  if (session && roleRequired && session?.user.role !== roleRequired) return;
  return (
    <li>
      <Link
        href={path}
        className="transition-colors hover:text-foreground/80 text-foreground/60"
      >
        {label}
      </Link>
    </li>
  );
};
