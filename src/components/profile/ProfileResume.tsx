'use client';
import { FileText } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import SheetWrapper from './sheets/SheetWrapper';
import { SHEETS } from '@/lib/constant/profile.constant';
import UploadResumeForm from './forms/UploadResumeForm';

const ProfileResume = () => {
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);

  const handleClose = () => {
    setIsSheetOpen(false);
  };
  const handleOpen = () => {
    setIsSheetOpen(true);
  };

  return (
    <>
      <h3 className="font-bold text-2xl">Resume</h3>
      <div className="border rounded-2xl  h-80 overflow-hidden flex flex-col gap-y-4 px-6 items-center justify-center">
        <FileText width={32} height={32} />
        <div className="text-center">
          <h4 className="font-bold text-xl">
            You haven’t uploaded a resume yet
          </h4>
          <p className="text-sm font-medium text-gray-500">
            Upload your resume to showcase your skills and experiences to
            recruiters.
          </p>
        </div>
        <Button className="text-white rounded-sm" onClick={handleOpen}>
          Upload your resume
        </Button>
      </div>
      <SheetWrapper
        isOpen={isSheetOpen}
        handleClose={handleClose}
        title={SHEETS.resume.title}
        description={SHEETS.resume.description}
      >
        <UploadResumeForm handleClose={handleClose} />
      </SheetWrapper>
    </>
  );
};

export default ProfileResume;
