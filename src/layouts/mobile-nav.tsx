import Icon from '@/components/ui/icon';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { toast } from '@/components/ui/use-toast';
import APP_PATHS from '@/config/path.config';
import { navbar } from '@/lib/constant/app.constant';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function MobileNav() {
  const router = useRouter();
  const session = useSession();
  const [open, isOpen] = useState(false);

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
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription></SheetDescription>
          <ul className="grid gap-2 text-sm lg:gap-6 justify-items-start">
            {navbar.map((item) => (
              <Item {...item} key={item.id} />
            ))}
            {session.status !== 'loading' && !session.data?.user && (
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
            )}
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
                <li onClick={() => isOpen(true)}>
                  <SheetClose className="flex gap-2 items-center transition-colors hover:text-foreground/80 text-foreground/60">
                    Logout
                  </SheetClose>
                </li>
              </>
            )}
          </ul>
        </SheetHeader>
      </SheetContent>
      <Dialog open={open} onOpenChange={isOpen}>
        <DialogContent>
          <DialogHeader>
            <div className="flex justify-center flex-col items-center gap-4">
              <Icon
                icon="logout"
                className="h-[4rem] w-[4rem] text-accent-foreground/80 "
              />
              <DialogTitle className="mb-4 text-[1.7rem]">
                Confirm logout
              </DialogTitle>
            </div>
            <DialogDescription>
              Are you sure you want to log out?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="button" variant="destructive" onClick={handleSignout}>
              Logout
            </Button>
            <DialogClose asChild>
              <Button
                type="button"
                variant="secondary"
                className="mb-2 md:mb-0"
              >
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Sheet>
  );
}

const Item = ({
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
  if (session && roleRequired && session.data?.user.role !== roleRequired)
    return;
  return (
    <li>
      <Link
        href={path}
        aria-selected={pathname === path}
        className="transition-colors hover:text-foreground/80 text-foreground/60"
      >
        <SheetClose>{label}</SheetClose>
      </Link>
    </li>
  );
};
