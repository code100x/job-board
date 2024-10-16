'use client';
import { ProfileInfo } from '@/components/profile/ProfileInfo';
import APP_PATHS from '@/config/path.config';
import { Edit } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
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
        <span className="w-full">My Account</span>
        <Link
          href={'/profile/edit'}
          className="sm:w-40 w-full items-center justify-center gap-4 md:flex hidden"
        >
          <Edit size={18} />
          Edit Profile
        </Link>
      </div>
      <ProfileInfo />
    </div>
  );
};

export default ProfilePage;
