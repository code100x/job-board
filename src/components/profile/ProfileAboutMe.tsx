'use client';
import { FileText } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import SheetWrapper from './sheets/SheetWrapper';
import ReadMeForm from './forms/ReadMeForm';
import { SHEETS } from '@/lib/constant/profile.constant';

const ProfileAboutMe = () => {
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);

  const handleClose = () => {
    setIsSheetOpen(false);
  };
  const handleOpen = () => {
    setIsSheetOpen(true);
  };

  return (
    <>
      <h3 className="font-bold text-2xl">About Me</h3>
      <div className="border rounded-2xl  h-80 overflow-hidden flex flex-col gap-y-4 px-6 items-center justify-center">
        <FileText width={32} height={32} />
        <div className="text-center">
          <h4 className="font-bold text-xl">
            You haven’t added an about me yet
          </h4>
          <p className="text-sm font-medium text-gray-500">
            Share a brief introduction to let companies know who you are.
          </p>
        </div>
        <Button onClick={handleOpen} className="text-white rounded-sm">
          Add About Me
        </Button>
      </div>
      <SheetWrapper
        isOpen={isSheetOpen}
        handleClose={handleClose}
        title={SHEETS.aboutMe.title}
        description={SHEETS.aboutMe.description}
      >
        <ReadMeForm handleClose={handleClose} />
      </SheetWrapper>
    </>
  );
};

export default ProfileAboutMe;
