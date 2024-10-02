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
import { toast } from 'react-hot-toast';
import APP_PATHS from '@/config/path.config';
import { useRouter } from 'next/navigation';

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

  const handleManageProfile = () => {
    toast('Coming soon!', {
      icon: '🚀',
      duration: 2000,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0 py-2 h-8 w-8 px-0"
        >
          <Icon icon="profile" className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Profile</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleManageProfile}>
          Manage Profile
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={'/create'}>Create Job</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={'/setting'}>Setting</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSignout}>
          <div className="flex gap-2 items-center">
            Logout
            <Icon
              icon="logout"
              className="h-[1rem] w-[1rem] text-accent-foreground/80"
            />
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
