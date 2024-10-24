'use client';
import { Info } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import SheetWrapper from './sheets/SheetWrapper';
import { SHEETS } from '@/lib/constant/profile.constant';
import ProjectForm from './forms/ProjectForm';

const ProfileProjects = () => {
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);

  const handleClose = () => {
    setIsSheetOpen(false);
  };
  const handleOpen = () => {
    setIsSheetOpen(true);
  };

  return (
    <>
      <h3 className="font-bold text-2xl">Projects</h3>
      <div className="border rounded-2xl  h-80 overflow-hidden flex flex-col gap-y-4 px-6 items-center justify-center">
        <Info width={32} height={32} />
        <div className="text-center">
          <h4 className="font-bold text-xl">
            You haven’t added any projects yet
          </h4>
          <p className="text-sm font-medium text-gray-500">
            Showcase your projects to demonstrate your skills and expertise.
          </p>
        </div>
        <Button className="text-white rounded-sm" onClick={handleOpen}>
          Add your projects
        </Button>
      </div>
      <SheetWrapper
        isOpen={isSheetOpen}
        handleClose={handleClose}
        title={SHEETS.project.title}
        description={SHEETS.project.description}
      >
        <ProjectForm handleClose={handleClose} />
      </SheetWrapper>
    </>
  );
};

export default ProfileProjects;
