'use client';
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Pencil, Settings, Share2 } from 'lucide-react';
import SheetWrapper from './sheets/SheetWrapper';
import EditProfileForm from './forms/EditProfileForm';
import { SHEETS } from '@/lib/constant/profile.constant';
import AccountSeetingForm from './forms/AccountSeetingForm';

const ProfileHeroSection = () => {
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
  const [isAccountOpen, setIsAccountOpen] = useState<boolean>(false);

  const handleClose = () => {
    setIsSheetOpen(false);
    setIsAccountOpen(false);
  };

  const handleOpen = () => {
    setIsSheetOpen(true);
  };

  return (
    <>
      <div className="border rounded-2xl  h-72 overflow-hidden">
        <div className="w-full h-32 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
        <div className="p-6 relative flex-col flex gap-y-3">
          <Avatar className="h-32 w-32 absolute -top-16">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="w-full flex justify-end gap-2">
            <Button
              variant={'outline'}
              className="px-3 py-2 rounded-sm"
              onClick={handleOpen}
            >
              <Pencil height={16} width={16} />
            </Button>
            <Button
              onClick={() => setIsAccountOpen(true)}
              variant={'outline'}
              className="px-3 py-2 rounded-sm"
            >
              <Settings height={16} width={16} />
            </Button>
            <Button variant={'outline'} className="px-3 py-2 rounded-sm">
              <Share2 height={16} width={16} />
            </Button>
          </div>
          <div>
            <h2 className="text-4xl font-bold">Jhone Doe</h2>
            <a href="#" className="text-sm text-primary font-semibold">
              @jhonedoe
            </a>
          </div>
        </div>
      </div>
      <SheetWrapper
        isOpen={isSheetOpen}
        handleClose={handleClose}
        title={SHEETS.editProfile.title}
        description={SHEETS.editProfile.description}
      >
        <EditProfileForm handleClose={handleClose} />
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
  );
};

export default ProfileHeroSection;
