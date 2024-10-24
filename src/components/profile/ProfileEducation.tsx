'use client';
import { Info } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import SheetWrapper from './sheets/SheetWrapper';
import { SHEETS } from '@/lib/constant/profile.constant';
import EducationForm from './forms/EducationForm';

const ProfileEducation = () => {
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);

  const handleClose = () => {
    setIsSheetOpen(false);
  };
  const handleOpen = () => {
    setIsSheetOpen(true);
  };

  return (
    <>
      <h3 className="font-bold text-2xl">Education</h3>
      <div className="border rounded-2xl  h-80 overflow-hidden flex flex-col gap-y-4 px-6 items-center justify-center">
        <Info width={32} height={32} />
        <div className="text-center">
          <h4 className="font-bold text-xl">You haven’t added education yet</h4>
          <p className="text-sm font-medium text-gray-500">
            Provide your education background to complete your profile.
          </p>
        </div>
        <Button onClick={handleOpen} className="text-white rounded-sm">
          Add your education
        </Button>
      </div>

      <SheetWrapper
        isOpen={isSheetOpen}
        handleClose={handleClose}
        title={SHEETS.education.title}
        description={SHEETS.education.description}
      >
        <EducationForm handleClose={handleClose} />
      </SheetWrapper>
    </>
  );
};

export default ProfileEducation;
