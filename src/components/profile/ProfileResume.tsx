'use client';
import { FileText, Pencil } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import SheetWrapper from './sheets/SheetWrapper';
import { SHEETS } from '@/lib/constant/profile.constant';
import UploadResumeForm from './forms/UploadResumeForm';
import { format } from 'date-fns';
import { ResumeDeleteDialog } from './resumeDeleteDialog';

const ProfileResume = ({
  isOwner,
  resume,
  name,
  resumeUpdateDate,
}: {
  isOwner: boolean;
  resume: string;
  name: string;
  resumeUpdateDate: Date;
}) => {
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);

  const handleClose = () => {
    setIsSheetOpen(false);
  };
  const handleOpen = () => {
    setIsSheetOpen(true);
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-2xl">Resume</h3>
        {isOwner && (
          <Button
            variant={'outline'}
            className="px-3 py-2 rounded-sm text-slate-500 dark:text-slate-400 flex gap-2"
            onClick={handleOpen}
          >
            <Pencil height={16} width={16} /> Edit
          </Button>
        )}
      </div>

      {resume.length === 0 && (
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
      )}
      {resume && (
        <div className="rounded-2xl gap-y-4 p-6 dark:bg-slate-900 bg-slate-100 flex justify-between items-center">
          <div className="flex gap-x-4">
            <div className="border-slate-200 w-fit border dark:border-slate-800 p-2 rounded-[12px]">
              <FileText width={32} height={32} className="text-slate-500" />
            </div>
            <div>
              <h2 className="text-xl font-bold">
                {' '}
                {name.replace(' ', '_') + '_resume'}{' '}
              </h2>
              <p className="font-medium text-slate-500">
                {format(resumeUpdateDate, 'dd MMM yyyy')}
              </p>
            </div>
          </div>
          {isOwner && <ResumeDeleteDialog />}
        </div>
      )}
      {isOwner && (
        <SheetWrapper
          isOpen={isSheetOpen}
          handleClose={handleClose}
          title={SHEETS.resume.title}
          description={SHEETS.resume.description}
        >
          <UploadResumeForm handleClose={handleClose} />
        </SheetWrapper>
      )}
    </>
  );
};

export default ProfileResume;
