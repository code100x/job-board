'use client';
import { getUserDetails } from '@/actions/user.profile.actions';
import APP_PATHS from '@/config/path.config';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const session = useSession();
  useEffect(() => {
    if (session.status !== 'loading' && session.status === 'unauthenticated')
      router.push(`${APP_PATHS.SIGNIN}?redirectTo=/profile`);
  }, [session.status, router]);
  useEffect(() => {
    async function fetchUserDetails() {
      try {
        const res = await getUserDetails();
        if (res.status) {
          localStorage.setItem(
            'skills',
            JSON.stringify(res.additional?.skills)
          );
          localStorage.setItem(
            'resume',
            JSON.stringify(res.additional?.resume)
          );
        }
      } catch (_error) {}
    }
    fetchUserDetails();
  }, []);
  return (
    <div className="flex flex-col w-full container md:gap-6 md:pt-6 relative">
      {children}
    </div>
  );
};

export default ProfileLayout;
