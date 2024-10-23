'use client';
import { EditProfile } from '@/components/profile/EditProfile';
import APP_PATHS from '@/config/path.config';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const EditProfilePage = () => {
  const router = useRouter();
  const session = useSession();
  useEffect(() => {
    if (session.status === 'unauthenticated')
      router.push(`${APP_PATHS.SIGNIN}?redirectTo=/profile`);
  }, [session.status, router]);
  const user = session.data?.user;

  return (
    <div className="md:container flex flex-col w-full">
      <div className="flex justify-between items-center">
        <span>Edit Profile</span>
      </div>
      <EditProfile name={user?.name || ''} email={user?.email || ''} />
    </div>
  );
};

export default EditProfilePage;
