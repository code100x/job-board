'use client';
import { ChevronDown, ChevronUp, FileStack, Plus } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import SheetWrapper from './sheets/SheetWrapper';
import { SHEETS } from '@/lib/constant/profile.constant';
import ProjectForm from './forms/ProjectForm';
import { ProjectType } from '@/types/user.types';
import ProfileProject from './ProfileProject';
import ProfileEmptyContainers from './emptycontainers/ProfileEmptyContainers';

const ProfileProjects = ({
  isOwner,
  projects,
}: {
  isOwner: boolean;
  projects: ProjectType[];
}) => {
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(
    null
  );
  const [isSeeMore, setIsSeeMore] = useState<boolean>(false);

  const handleClose = () => {
    setIsSheetOpen(false);
  };
  const handleOpen = () => {
    setIsSheetOpen(true);
  };

  const handleEditClick = (project: ProjectType) => {
    setSelectedProject(project);
    handleOpen();
  };

  const handleSeeMore = () => {
    setIsSeeMore(!isSeeMore);
  };

  const allProjects = useMemo(() => {
    return projects
      .filter((project) => {
        if (!isSeeMore) {
          return project.isFeature === true;
        }
        return true;
      })
      .sort((a, b) => Number(b.isFeature) - Number(a.isFeature));
  }, [projects, isSeeMore]);

  const title = selectedProject
    ? SHEETS.project.title.replace('Add New', 'Edit')
    : SHEETS.project.title;

  return (
    <>
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-2xl">Projects</h3>
        {isOwner && (
          <Button
            variant={'outline'}
            className="px-3 py-2 rounded-sm text-slate-500 dark:text-slate-400 flex gap-2"
            onClick={handleOpen}
          >
            <Plus height={16} width={16} /> Add Project
          </Button>
        )}
      </div>

      {projects.length === 0 && (
        <ProfileEmptyContainers
          isOwner={isOwner}
          buttonText="Add Your Projects"
          handleClick={handleOpen}
          title={
            isOwner
              ? 'You haven’t added any projects yet'
              : 'No Projects Added.'
          }
          description={
            isOwner
              ? 'Showcase your projects to demonstrate your skills and expertise.'
              : ''
          }
          Icon={FileStack}
        />
      )}
      {projects.length !== 0 && (
        <>
          <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-6 ">
            {allProjects.map((project) => (
              <ProfileProject
                key={project.id}
                project={project}
                handleEditClick={handleEditClick}
                isOwner={isOwner}
              />
            ))}
          </div>
          <Button
            onClick={handleSeeMore}
            className="dark:border-slate-800 px-3 bg-transparent hover:bg-transparent w-fit border py-2 text-base font-medium flex gap-2 rounded-[8px] border-slate-200 text-slate-500 dark:text-slate-400"
          >
            {isSeeMore
              ? 'Hide'
              : allProjects.length === 0
                ? 'Show non featured projects'
                : 'See More'}
            {isSeeMore ? (
              <ChevronUp height={16} width={16} />
            ) : (
              <ChevronDown height={16} width={16} />
            )}
          </Button>
        </>
      )}

      {isOwner && (
        <SheetWrapper
          isOpen={isSheetOpen}
          handleClose={handleClose}
          title={title}
          description={SHEETS.project.description}
        >
          <ProjectForm
            handleClose={handleClose}
            selectedProject={selectedProject}
          />
        </SheetWrapper>
      )}
    </>
  );
};

export default ProfileProjects;
