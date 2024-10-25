'use client';
import { Circle, Info, Pencil, Plus } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import SheetWrapper from './sheets/SheetWrapper';
import { SHEETS } from '@/lib/constant/profile.constant';
import ExperienceForm from './forms/ExperienceForm';
import { ExperienceType } from '@/types/user.types';
import { format } from 'date-fns';
import { ExperienceDeleteDialog } from './ExperienceDeleteDialog';

const ProfileExperience = ({
  isOwner,
  experiences,
}: {
  isOwner: boolean;
  experiences: ExperienceType[];
}) => {
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
  const [selecetedExperience, setSelecetedExperience] =
    useState<ExperienceType | null>(null);

  const handleEditClick = (experience: ExperienceType) => {
    setSelecetedExperience(experience);
    handleOpen();
  };

  const handleClose = () => {
    setIsSheetOpen(false);
  };
  const handleOpen = () => {
    setIsSheetOpen(true);
  };
  function formatDateRange(startDate: Date, endDate: Date | null): string {
    const startFormatted = format(startDate, 'MMMM yy');
    const endFormatted = endDate ? format(endDate, 'MMMM yy') : 'Present';

    return `${startFormatted} - ${endFormatted}`;
  }

  const title = selecetedExperience
    ? SHEETS.expierence.title.replace('Add', 'Edit')
    : SHEETS.expierence.title;

  return (
    <>
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-2xl">Work Experience</h3>
        {isOwner && (
          <Button
            variant={'outline'}
            className="px-3 py-2 rounded-sm text-slate-500 dark:text-slate-400 flex gap-2"
            onClick={handleOpen}
          >
            <Plus height={16} width={16} /> Add Experience
          </Button>
        )}
      </div>
      {experiences.length === 0 && (
        <div className="border rounded-2xl  h-80 overflow-hidden flex flex-col gap-y-4 px-6 items-center justify-center">
          <Info width={32} height={32} />
          <div className="text-center">
            <h4 className="font-bold text-xl">
              You haven’t added work experience yet
            </h4>
            <p className="text-sm font-medium text-gray-500">
              Share your experience to attract the right companies.
            </p>
          </div>
          <Button onClick={handleOpen} className="text-white rounded-sm">
            Add your work experience
          </Button>
        </div>
      )}

      {experiences.length !== 0 && (
        <div className="rounded-2xl p-6 dark:bg-slate-900 bg-slate-100">
          {experiences.map((experience) => (
            <div key={experience.id} className="flex flex-col">
              <div className="flex gap-3 justify-start">
                <div className="relative w-4 flex justify-center">
                  <div className="absolute top-0 w-2 h-2 rounded-full bg-[#3259E8]"></div>
                  <div className="w-[2px] h-full bg-gradient-to-b from-[#3259e8] to-[#F1F5F9] dark:to-[#0F172A]"></div>
                </div>
                <div className="flex flex-col gap-2 mb-3 w-full">
                  <div className="flex justify-between">
                    <div className="flex flex-col gap-1">
                      <h2 className="dark:text-slate-50 text-[#020817] text-xl font-bold ">
                        {experience.designation}
                      </h2>
                      <p className="flex gap-[4px] items-center text-sm font-medium text-slate-500 dark:text-slate-400">
                        <span className="text-[#3259E8] text-sm font-medium">
                          {experience.companyName}
                        </span>
                        <Circle width={5} height={5} fill="currentColor" />
                        {experience.EmploymentType}
                        <Circle width={5} height={5} fill="currentColor" />
                        {experience.workMode}
                      </p>
                      <div className="px-3 py-1 bg-slate-500 bg-opacity-10 text-slate-500 dark:text-slate-400 rounded-[8px] text-sm w-fit">
                        {formatDateRange(
                          experience.startDate,
                          experience.endDate
                        )}
                      </div>
                    </div>
                    <div className="flex gap-3 items-center w-fit">
                      <ExperienceDeleteDialog experienceId={experience.id} />
                      <Button
                        className="bg-transparent p-0 b-0 hover:bg-transparent"
                        onClick={() => handleEditClick(experience)}
                      >
                        <Pencil
                          width={16}
                          height={16}
                          className="dark:text-slate-400 text-slate-500"
                        />
                      </Button>
                    </div>
                  </div>
                  <p className="text-[#020817] dark:text-slate-50 text-base font-medium">
                    {experience.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isOwner && (
        <SheetWrapper
          isOpen={isSheetOpen}
          handleClose={handleClose}
          title={title}
          description={SHEETS.expierence.description}
        >
          <ExperienceForm
            handleClose={handleClose}
            selecetedExperience={selecetedExperience}
          />
        </SheetWrapper>
      )}
    </>
  );
};

export default ProfileExperience;
