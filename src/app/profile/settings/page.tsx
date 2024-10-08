'use client';
import { AccountSettings } from '@/components/profile/AccountSettings';
import APP_PATHS from '@/config/path.config';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const AccountSettingsPage = () => {
  const router = useRouter();
  const session = useSession();
  useEffect(() => {
    if (session.status !== 'loading' && session.status === 'unauthenticated')
      router.push(`${APP_PATHS.SIGNIN}?redirectTo=/profile`);
  }, [session.status]);
  return (
    <div className="md:container flex flex-col w-full">
      <div className="flex justify-between items-center mb-4">
        <span>Account Settings</span>
      </div>
      <AccountSettings />
    </div>
  );
};

export default AccountSettingsPage;
