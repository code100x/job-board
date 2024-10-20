'use client';
import { UserProjects } from '@/components/profile/UserProject';
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
      <div className="flex justify-between items-center">
        <span>Projects</span>
      </div>
      <UserProjects />
    </div>
  );
}
