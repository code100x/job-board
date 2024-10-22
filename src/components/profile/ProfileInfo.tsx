'use client';

import React, { useEffect } from 'react';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

import APP_PATHS from '@/config/path.config';

import { getNameInitials } from '@/lib/utils';
import icons from '@/lib/icons';
import Link from 'next/link';
export const ProfileInfo = () => {
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
      <div className="flex flex-col gap-1 p-4 w-full border rounded-xl">
        <div className="flex justify-between items-center mb-3">
          <span>Socials</span>
        </div>
        <div className="grid grid-cols-4">
          <div className="col-span-1 flex items-center justify-start gap-2">
            <icons.github />
            <Link href={'https://github.com/curiouscoder00'} target="_blank">
              @curiouscoder00
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 p-4 border rounded-md w-full min-h-[40vh]">
        <div className="flex justify-between items-center mb-3">
          <span>Profile Info</span>
        </div>
        <div className="flex flex-col gap-4">
          <Label>Name</Label>
          <Input
            disabled
            value={session.data?.user.name}
            className="rounded focus-visible:ring-0 focus:outline-none focus:border-slate-500"
          />
        </div>
        <div className="flex flex-col gap-4">
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
