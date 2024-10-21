'use client';
import { getUserDetails } from '@/actions/user.profile.actions';
import Sidebar from '@/components/profile/sidebar';
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
    <div className="container flex max-md:flex-col md:gap-5 w-full relative">
      <Sidebar />
      <div className="flex px-2 w-full overflow-y-auto md:max-h-[73vh] lg:h-full md:border md:rounded-xl md:pt-6 no-scrollbar">
        {children}
      </div>
    </div>
  );
};

export default ProfileLayout;
