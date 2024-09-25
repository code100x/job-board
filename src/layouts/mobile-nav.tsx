import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { toast } from '@/components/ui/use-toast';
import APP_PATHS from '@/config/path.config';
import {
  adminNavbar,
  nonUserNavbar,
  userNavbar,
} from '@/lib/constant/app.constant';
import {
  CircleHelp,
  Contact,
  DollarSign,
  LogOut,
  Menu,
  PackageSearch,
  Pen,
  Users,
  X,
} from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { CompanyLogo } from './header';
import spotifyLogo from '../../public/spotify.svg';
import Image from 'next/image';
import { ADMIN_ROLE } from '@/config/app.config';
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
      <SheetTrigger className="border p-2.5 rounded-lg text-foreground/60 hover:dark:bg-[#191919] hover:bg-gray-100">
        <Menu className="w-4 h-4" />
      </SheetTrigger>
      <SheetContent className="w-full">
        <SheetHeader className="h-fit rounded-xl border dark:border-[#1E293B]">
          <SheetTitle className="w-full flex justify-between items-center p-3  border-b dark:border-b-[#1E293B]">
            <CompanyLogo />
            <SheetClose className="rounded-sm h-fit opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none  disabled:pointer-events-none data-[state=open]:bg-secondary">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </SheetClose>
          </SheetTitle>
          <ul className="flex flex-col gap-2 text-sm justify-items-start px-4 py-2">
            {session.status !== 'loading' && session.data?.user && (
              <div className="w-full flex items-center">
                {session.data?.user.role === ADMIN_ROLE ? (
                  <div className="w-12 h-12 rounded-full flex items-center justify-center border-none ouline-none dark:bg-[#0F172A] dark:text-white bg-slate-200">
                    <p>HS</p>
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full flex items-center justify-center border-none ouline-none">
                    <Image
                      width={400}
                      height={400}
                      className="object-cover w-full h-full"
                      src={spotifyLogo}
                      alt="company-logo"
                    />
                  </div>
                )}
                <div className="flex flex-col items-start justify-center px-2 mt-2">
                  <p className="font-semibold text-lg dark:text-[#F8FAFC] text-[#020817]">
                    {session.data?.user.role === ADMIN_ROLE
                      ? 'Harkirat Singh'
                      : 'User'}
                  </p>
                  <div className="flex items-center text-[#64748B] dark:text-[#94A3B8]">
                    <p className="py-1 text-sm  font-medium">
                      {session.data?.user.role === ADMIN_ROLE
                        ? 'admin@gmail.com'
                        : 'work@spotify.com'}
                    </p>
                  </div>
                </div>
              </div>
            )}
            {session.status !== 'loading' && !session.data?.user && (
              <>
                {nonUserNavbar.map((item) => (
                  <Item {...item} key={item.id} />
                ))}

                <Link href={'/create'} className="">
                  <SheetClose className="w-full">
                    <div className="w-full rounded-lg p-2 my-2 bg-[#3259E8] hover:bg-[#3e63e9] text-white font-medium ">
                      Post a job
                    </div>
                  </SheetClose>
                </Link>
              </>
            )}
            {session.status !== 'loading' && session.data?.user && (
              <>
                {userNavbar.map((item) => (
                  <Item {...item} key={item.id} />
                ))}
              </>
            )}
            {session.status !== 'loading' &&
              session.data?.user.role === ADMIN_ROLE && (
                <>
                  {adminNavbar.map((item) => (
                    <Item {...item} key={item.id} />
                  ))}
                </>
              )}
          </ul>
          {session.status !== 'loading' && session.data?.user && (
            <SheetClose className="w-full border-t rounded-lg rounded-t-none dark:border-t-[#1E293B] h-fit p-3">
              <button
                onClick={handleSignout}
                className="text-[#DD503F] flex items-center justify-start font-medium text-lg"
              >
                <LogOut className="w-4 h-4" />
                <p className="mx-1">Logout</p>
              </button>
            </SheetClose>
          )}
        </SheetHeader>
      </SheetContent>
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
    <li className="my-1 dark:hover:bg-slate-800 hover:bg-slate-50 p-2 rounded-lg">
      <Link
        href={path}
        aria-selected={pathname === path}
        className="transition-colors hover:text-foreground/80 text-foreground/60"
      >
        <SheetClose className="flex items-center font-medium text-lg">
          {label === 'Explore jobs' ? (
            <PackageSearch className="mr-2 w-4 h-4" />
          ) : label === 'Pricing' ? (
            <DollarSign className="mr-2 w-4 h-4" />
          ) : label === 'Contact us' ? (
            <Contact className="mr-2 w-4 h-4" />
          ) : label === 'Manage Jobs' ? (
            <PackageSearch className="mr-2 w-4 h-4" />
          ) : label === 'Payment History' ? (
            <DollarSign className="mr-2 w-4 h-4" />
          ) : label === 'Post a Job' ? (
            <Pen className="mr-2 w-4 h-4" />
          ) : label === 'Help' ? (
            <CircleHelp className="mr-2 w-4 h-4" />
          ) : (
            label === 'Manage Recruiters' && <Users className="mr-2 w-4 h-4" />
          )}
          <p className="dark:text-[#F8FAFC] text-[#212121]">{label}</p>
        </SheetClose>
      </Link>
    </li>
  );
};
