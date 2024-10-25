'use client';
import { Info, Pencil } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import SheetWrapper from './sheets/SheetWrapper';
import { SHEETS } from '@/lib/constant/profile.constant';
import { SkillsForm } from './forms/SkillsForm';

const ProfileSkills = ({
  isOwner,
  skills,
}: {
  isOwner: boolean;
  skills: string[];
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
        <h3 className="font-bold text-2xl">Skills</h3>
        {isOwner && (
          <Button
            variant={'outline'}
            className="px-3 py-2 rounded-sm text-slate-500 dark:text-slate-400 flex gap-2"
            onClick={handleOpen}
          >
            <Pencil height={16} width={16} /> Update
          </Button>
        )}
      </div>
      {skills.length === 0 && (
        <div className="border rounded-2xl  h-80 overflow-hidden flex flex-col gap-y-4 px-6 items-center justify-center">
          <Info width={32} height={32} />
          <div className="text-center">
            <h4 className="font-bold text-xl">
              You haven’t added any skills yet
            </h4>
            <p className="text-sm font-medium text-gray-500">
              Highlight your skills to stand out to potential employers.
            </p>
          </div>
          <Button onClick={handleOpen} className="text-white rounded-sm">
            Add your skills
          </Button>
        </div>
      )}
      {skills.length !== 0 && (
        <div className="rounded-2xl gap-x-2 p-6 dark:bg-slate-900 bg-slate-100 flex flex-wrap">
          {skills.map((title) => {
            return (
              <div
                key={title}
                className="dark:border-slate-800 border px-3 py-2 rounded-[8px] dark:text-slate-50 border-slate-200"
              >
                {title}
              </div>
            );
          })}
        </div>
      )}
      {isOwner && (
        <SheetWrapper
          isOpen={isSheetOpen}
          handleClose={handleClose}
          title={SHEETS.skills.title}
          description={SHEETS.skills.description}
        >
          <SkillsForm handleClose={handleClose} skills={skills} />
        </SheetWrapper>
      )}
    </>
  );
};

export default ProfileSkills;
