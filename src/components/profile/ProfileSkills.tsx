'use client';
import { Info } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { AddSkills } from '../user-multistep-form/add-skills-form';

const ProfileSkills = () => {
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);

  const handleClose = () => {
    setIsSheetOpen(false);
  };
  const handleOpen = () => {
    setIsSheetOpen(true);
  };
  return (
    <>
      <h3 className="font-bold text-2xl">Skills</h3>
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
      <Sheet open={isSheetOpen} onOpenChange={handleClose}>
        <SheetContent className="flex flex-col pb-0">
          <SheetHeader>
            <SheetTitle className="text-2xl">Add Your Skills</SheetTitle>
            <SheetDescription>
              Showcase your strongest skills to make your profile stand out to
              recruiters.
            </SheetDescription>
          </SheetHeader>
          <div className="mt-5 flex-1 relative">
            <AddSkills />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ProfileSkills;
