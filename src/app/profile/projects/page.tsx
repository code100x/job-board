'use client';
import { UserProjects } from '@/components/profile/UserProject';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { AddProject } from '@/components/user-multistep-form/add-project-form';
import APP_PATHS from '@/config/path.config';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function AccountProjectPage() {
  const router = useRouter();
  const session = useSession();
  useEffect(() => {
    if (session.status !== 'loading' && session.status === 'unauthenticated')
      router.push(`${APP_PATHS.SIGNIN}?redirectTo=/profile`);
  }, [session.status, router]);
  return (
    <div className="md:container flex flex-col w-full gap-4">
      <div className="flex md:justify-between justify-start gap-5 items-center">
        <span>Projects</span>
        <Dialog>
          <DialogTrigger>Add more</DialogTrigger>
          <DialogContent className="max-w-md max-h-[90vh] flex flex-col p-0">
            <DialogHeader className="p-6 pb-2">
              <DialogTitle>Add Project</DialogTitle>
            </DialogHeader>
            <div className="flex-grow overflow-y-auto px-6 pb-6">
              <AddProject />
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <UserProjects />
    </div>
  );
}
