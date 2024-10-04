'use client';
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
  }, [session.status]);
  return (
    <div className="container flex gap-2 w-full">
      <Sidebar />
      <div className="flex px-2 w-full overflow-y-auto md:max-h-[73vh]">
        {children}
      </div>
    </div>
  );
};

export default ProfileLayout;
