'use client';
import { SquareUserRound, Pencil } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import SheetWrapper from './sheets/SheetWrapper';
import { SHEETS } from '@/lib/constant/profile.constant';
import ProfileEmptyContainers from './emptycontainers/ProfileEmptyContainers';
import AboutMeForm from './forms/ReadMeForm';

const ProfileAboutMe = ({
  aboutMe,
  isOwner,
}: {
  aboutMe: string;
  isOwner: boolean;
}) => {
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);

  const title =
    aboutMe.length === 0
      ? SHEETS.aboutMe.title
      : SHEETS.aboutMe.title.replace('Add', 'Edit');

  const handleClose = () => {
    setIsSheetOpen(false);
  };
  const handleOpen = () => {
    setIsSheetOpen(true);
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-2xl">About Me</h3>
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
      {!aboutMe && (
        <ProfileEmptyContainers
          isOwner={isOwner}
          buttonText="Add About Me"
          handleClick={handleOpen}
          title={
            isOwner ? 'You haven’t added an about me yet' : 'No About Me added.'
          }
          description={
            isOwner
              ? 'Share a brief introduction to let companies know who you are.'
              : ''
          }
          Icon={SquareUserRound}
        />
      )}
      {aboutMe && (
        <div className="rounded-2xl p-6 dark:bg-slate-900 bg-slate-100">
          <p className="text-base leading-normal">{aboutMe}</p>
        </div>
      )}
      {isOwner && (
        <SheetWrapper
          isOpen={isSheetOpen}
          handleClose={handleClose}
          title={title}
          description={SHEETS.aboutMe.description}
        >
          <AboutMeForm handleClose={handleClose} aboutMe={aboutMe} />
        </SheetWrapper>
      )}
    </>
  );
};

export default ProfileAboutMe;
