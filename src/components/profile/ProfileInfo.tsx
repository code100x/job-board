'use client';

import React, { useEffect, useState } from 'react';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

import APP_PATHS from '@/config/path.config';

import { getNameInitials } from '@/lib/utils';
import Link from 'next/link';
import Icon from '../ui/icon';
import icons from '@/lib/icons';
import { userSocialSchemaType } from '@/lib/validators/user.profile.validator';
import { getUserSocials } from '@/actions/user.profile.actions';
import SocialUsername from '@/lib/social-usernames';
export const ProfileInfo = () => {
  const router = useRouter();
  const session = useSession();
  const [socials, setSocials] = useState<userSocialSchemaType[]>([]);
  const fetchUserSocials = async () => {
    const res = await getUserSocials();
    if (res.status) {
      setSocials(res.additional?.socials || []);
    }
  };
  useEffect(() => {
    fetchUserSocials();
  }, [socials]);

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
        <div className="flex flex-wrap items-center justify-start gap-2">
          {socials.length > 0 ? (
            socials.map((social, index) => (
              <Link
                key={index}
                className="flex items-center justify-start gap-2 dark:bg-slate-900 hover:dark:bg-slate-800 bg-slate-200 hover:bg-slate-300 p-1 rounded-lg px-3"
                href={social.link}
                target="_blank"
              >
                <Icon
                  name={social.platform}
                  icon={social.platform as keyof typeof icons}
                />
                <span>{SocialUsername(social.platform, social.link)}</span>
              </Link>
            ))
          ) : (
            <div className="flex items-center justify-center w-full gap-2">
              <span>No socials added yet</span>
            </div>
          )}
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
