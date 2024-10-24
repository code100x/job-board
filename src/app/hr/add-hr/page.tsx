'use client';
import { AddHR } from '@/components/AddHR';
import APP_PATHS from '@/config/path.config';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const ProfilePage = () => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status !== 'loading' && session.status === 'unauthenticated')
      router.push(`${APP_PATHS.SIGNIN}?redirectTo=/create`);
  }, [session.status, router]);

  return (
    <div className="md:container flex flex-col w-full">
      <div className="flex justify-between items-start mb-4 w-full">
        <span className="w-full">Add HR</span>
      </div>
      <AddHR />
    </div>
  );
};

export default ProfilePage;
