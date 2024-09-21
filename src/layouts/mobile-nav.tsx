import Icon from '@/components/ui/icon';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import { toast } from '@/components/ui/use-toast';
import APP_PATHS from '@/config/path.config';
import { navbar } from '@/lib/constant/app.constant';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { CompanyLogo } from './header';
import { Button } from '@/components/ui/button';

export function MobileNav() {
  const router = useRouter();
  const session = useSession();

  const handleSignout = async () => {
    try {
      const res = await signOut({
        redirect: true,
        callbackUrl: APP_PATHS.HOME,
      });
      if (res) {
        return toast({
          title: 'Something went wrong',
          variant: 'destructive',
        });
      }
      toast({
        title: 'Logout successful!',
        variant: 'success',
      });
      const redirect = APP_PATHS.HOME;
      router.push(redirect);
    } catch (_error) {
      return toast({
        title: 'Internal server error',
        variant: 'destructive',
      });
    }
  };

  return (
    <Sheet>
      <SheetTrigger>
        <Icon icon="menu" />
      </SheetTrigger>
      <SheetContent className="w-full">
        <SheetHeader className=" border-b pb-4">
          <CompanyLogo />
        </SheetHeader>
        <SheetDescription></SheetDescription>
        <ul className="grid gap-4  text-sm lg:gap-6  py-2">
          {navbar.map((item) => (
            <Item {...item} key={item.id} />
          ))}
          <Link href={'/create'}>
            <SheetClose>
              <Button className="w-80 rounded bg-blue-800 dark:text-white">
                Post a Job
              </Button>
            </SheetClose>
          </Link>
          {/* {session.status !== 'loading' && !session.data?.user && (
            <>
              <li>
                <Link
                  href={APP_PATHS.SIGNIN}
                  className="transition-colors hover:text-foreground/80 text-foreground/60"
                >
                  <SheetClose>Login</SheetClose>
                </Link>
              </li>
              <li>
                <Link href={APP_PATHS.SIGNUP}>
                  <SheetClose>Start Free</SheetClose>
                </Link>
              </li>
            </> 
          )}*/}
          {session.status !== 'loading' && session.data?.user && (
            <>
              <li>
                <Link
                  href={'/create'}
                  className="transition-colors hover:text-foreground/80 text-foreground/60"
                >
                  <SheetClose>Create Job</SheetClose>
                </Link>
              </li>
              <li>
                <Link
                  href={'/setting'}
                  className="transition-colors hover:text-foreground/80 text-foreground/60"
                >
                  <SheetClose>Setting</SheetClose>
                </Link>
              </li>
              <li onClick={handleSignout}>
                <SheetClose className="flex gap-2 items-center transition-colors hover:text-foreground/80 text-foreground/60">
                  Logout
                  <Icon
                    icon="logout"
                    className="h-[1rem] w-[1rem] text-accent-foreground/80"
                  />
                </SheetClose>
              </li>
            </>
          )}
        </ul>
      </SheetContent>
    </Sheet>
  );
}

const Item = ({
  path,
  label,
  icon,
  roleRequired,
  isPrivate,
}: {
  path: string;
  label: string;
  icon: React.FC;
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
  if (session && roleRequired && session.data?.user.role !== roleRequired)
    return;
  const IconComponent = icon;
  return (
    <li>
      <Link
        href={path}
        aria-selected={pathname === path}
        className="transition-colors hover:text-foreground/80 text-foreground/60 flex gap-2"
      >
        <IconComponent />
        <SheetClose>{label}</SheetClose>
      </Link>
    </li>
  );
};
