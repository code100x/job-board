'use client';
import { UserExperience } from '@/components/profile/UserExperience';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { AddExperience } from '@/components/user-multistep-form/addExperience-form';
import APP_PATHS from '@/config/path.config';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AccountExperiencePage() {
  const router = useRouter();
  const session = useSession();
  useEffect(() => {
    if (session.status !== 'loading' && session.status === 'unauthenticated')
      router.push(`${APP_PATHS.SIGNIN}?redirectTo=/profile`);
  }, [session.status, router]);
  return (
    <div className="md:container flex flex-col w-full gap-4">
      <div className="flex md:justify-between justify-start items-center gap-5">
        <span>Experience</span>
        <Dialog>
          <DialogTrigger>Add more</DialogTrigger>
          <DialogContent className="w-4/5 sm:w-[400px] max-h-[90vh] flex flex-col p-0 rounded-xl">
            <DialogHeader className="p-6 pb-2">
              <DialogTitle className="">Add Experience</DialogTitle>
            </DialogHeader>
            <div className="flex-grow overflow-y-auto px-6 pb-6">
              <AddExperience />
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <UserExperience />
    </div>
  );
}
