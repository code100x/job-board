'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import Icon from './ui/icon';
import { toast } from './ui/use-toast';
import APP_PATHS from '@/config/path.config';
import { useRouter } from 'next/navigation';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { LogOut, TriangleAlertIcon } from 'lucide-react';

export function ProfileMenu() {
  const router = useRouter();

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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-600 dark:focus-visible:ring-primary-400 py-2 h-8 w-8 px-0 dark:bg-black bg-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <Icon
            icon="profile"
            className="h-[1.2rem] w-[1.2rem] text-gray-800 dark:text-gray-200"
          />
          <span className="sr-only">Profile</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-white dark:bg-black text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg"
      >
        <DropdownMenuItem asChild>
          <Link
            href={'/create'}
            className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors px-4 py-2 rounded-md"
          >
            Create Job
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href={'/setting'}
            className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors px-4 py-2 rounded-md"
          >
            Setting
          </Link>
        </DropdownMenuItem>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <div className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500 dark:hover:text-white transition-colors px-4 py-2 rounded-md flex items-center cursor-pointer">
              Logout <LogOut className="ml-2 h-5 w-5 animate-pulse" />
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white dark:bg-black text-gray-900 dark:text-gray-100 rounded-lg p-8 shadow-2xl border border-gray-200 dark:border-gray-700 max-w-lg mx-auto transform transition-all duration-300 ease-in-out">
            <AlertDialogHeader className="mb-6">
              <div className="flex items-center space-x-6">
                <div className="text-red-400">
                  <TriangleAlertIcon size={40} />
                </div>
                <div>
                  <AlertDialogTitle className="text-xl font-semibold tracking-tight">
                    Confirm Logout
                  </AlertDialogTitle>
                  <AlertDialogDescription className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Are you sure you want to log out? You will need to sign in
                    again to access your account.
                  </AlertDialogDescription>
                </div>
              </div>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex justify-end gap-4">
              <AlertDialogCancel className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 ease-in-out transform hover:scale-105 rounded-md px-4 py-2 font-medium shadow-md">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="bg-gradient-to-r from-red-500 to-red-600 dark:from-red-600 dark:to-red-700 text-white hover:from-red-600 hover:to-red-700 dark:hover:from-red-700 dark:hover:to-red-800 transition-all duration-200 ease-in-out transform hover:scale-105 rounded-md px-4 py-2 font-medium shadow-md"
                onClick={handleSignout}
              >
                Logout
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
