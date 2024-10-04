'use client';

import APP_PATHS from '@/config/path.config';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { getNameInitials } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
type Props = {};
export const ProfileInfo = ({}: Props) => {
  const router = useRouter();
  const session = useSession();
  useEffect(() => {
    if (session.status !== 'loading' && session.status === 'unauthenticated')
      router.push(`${APP_PATHS.SIGNIN}?redirectTo=/profile`);
  }, [session.status]);
  return (
    <div className="flex flex-col justify-center items-start my-3 gap-4">
      <div className="flex w-full mt-2 p-4 border rounded-md">
        <Avatar className="h-20 w-20">
          <AvatarImage src={session.data?.user.image} />
          <AvatarFallback>
            {getNameInitials(session.data?.user.name ?? '')}
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-col gap-3 p-4 border rounded-md w-full min-h-[45vh]">
        <div className="flex justify-between items-center my-4">
          <span>Profile Info</span>
        </div>
        <div className="flex flex-col gap-1">
          <Label>Name</Label>
          <Input
            disabled
            value={session.data?.user.name}
            className="rounded focus-visible:ring-0 focus:outline-none focus:border-slate-500"
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label>Email</Label>
          <Input
            disabled
            value={session.data?.user.email}
            className="rounded focus-visible:ring-0 focus:outline-none focus:border-slate-500"
          />
        </div>
      </div>
    </div>
  );
};
