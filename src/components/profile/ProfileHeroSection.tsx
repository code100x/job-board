'use client';
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Pencil, Settings, User } from 'lucide-react';
import SheetWrapper from './sheets/SheetWrapper';
import EditProfileForm from './forms/EditProfileForm';
import { SHEETS } from '@/lib/constant/profile.constant';
import AccountSeetingForm from './forms/AccountSeetingForm';
import { useSession } from 'next-auth/react';
import { UserType } from '@/types/user.types';
import ProfileSocials from './ProfileSocials';
import { ProfileShareDialog } from './ProfileShare';

const ProfileHeroSection = ({ userdetails }: { userdetails: UserType }) => {
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
  const [isAccountOpen, setIsAccountOpen] = useState<boolean>(false);

  const { status, data } = useSession();

  const handleClose = () => {
    setIsSheetOpen(false);
    setIsAccountOpen(false);
  };

  const handleOpen = () => {
    setIsSheetOpen(true);
  };

  return (
    <>
      <div className="border rounded-2xl  min-h-72 overflow-hidden">
        <div className="w-full h-32 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
        <div className="p-6 relative flex-col flex gap-y-3">
          <Avatar className="h-32 w-32 absolute -top-16 bg-slate-100 dark:bg-slate-900">
            {userdetails.avatar && (
              <AvatarImage src={userdetails.avatar} alt="@shadcn" />
            )}
            <AvatarFallback>
              <User
                width={32}
                height={32}
                className="dark:text-slate-400 text-slate-500"
              />
            </AvatarFallback>
          </Avatar>
          <div className="w-full flex justify-end gap-2 h-10">
            {status === 'authenticated' && data.user.id === userdetails.id && (
              <>
                <Button
                  variant={'outline'}
                  className="px-3 py-2 rounded-xs"
                  onClick={handleOpen}
                >
                  <Pencil height={16} width={16} />
                </Button>
                <Button
                  onClick={() => setIsAccountOpen(true)}
                  variant={'outline'}
                  className="px-3 py-2 rounded-xs"
                >
                  <Settings height={16} width={16} />
                </Button>
              </>
            )}
            <ProfileShareDialog />
          </div>
          <div>
            <h2 className="text-4xl font-bold">{userdetails.name}</h2>
          </div>
          <ProfileSocials userdetails={userdetails} />
        </div>
      </div>
      {status === 'authenticated' && data.user.id === userdetails.id && (
        <>
          <SheetWrapper
            isOpen={isSheetOpen}
            handleClose={handleClose}
            title={SHEETS.editProfile.title}
            description={SHEETS.editProfile.description}
          >
            <EditProfileForm
              userdetails={userdetails}
              handleClose={handleClose}
            />
          </SheetWrapper>
          <SheetWrapper
            isOpen={isAccountOpen}
            handleClose={handleClose}
            title={SHEETS.accountSetting.title}
            description={SHEETS.accountSetting.description}
          >
            <AccountSeetingForm handleClose={handleClose} />
          </SheetWrapper>
        </>
      )}
    </>
  );
};

export default ProfileHeroSection;
