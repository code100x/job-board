'use client';
import { UserResume } from '@/components/profile/UserResume';
import APP_PATHS from '@/config/path.config';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function AccountResumePage() {
  const router = useRouter();
  const session = useSession();
  useEffect(() => {
    if (session.status !== 'loading' && session.status === 'unauthenticated')
      router.push(`${APP_PATHS.SIGNIN}?redirectTo=/profile`);
  }, [session.status, router]);
  return (
    <div className="md:container flex flex-col w-full gap-4">
      <div className="flex justify-between items-center">
        <span>Resume</span>
      </div>
      <UserResume />
    </div>
  );
}
