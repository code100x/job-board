'use client';
import { ChevronDown, ChevronUp, Info, Plus } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import SheetWrapper from './sheets/SheetWrapper';
import { SHEETS } from '@/lib/constant/profile.constant';
import ProjectForm from './forms/ProjectForm';
import { ProjectType } from '@/types/user.types';
import ProfileProject from './ProfileProject';

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

  const featuredProjects = useMemo(() => {
    return projects.filter((project) => project.isFeature === true);
  }, [projects]);

  const nonFeaturedProjects = useMemo(() => {
    return projects.filter((project) => project.isFeature === false);
  }, [projects]);

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
      {featuredProjects.length === 0 && (
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
      )}
      {featuredProjects.length !== 0 && !isSeeMore && (
        <>
          <div className=" grid grid-cols-3 gap-x-6 gap-y-6 ">
            {featuredProjects.map((project) => (
              <ProfileProject
                key={project.id}
                project={project}
                handleEditClick={handleEditClick}
              />
            ))}
          </div>
          <Button
            onClick={handleSeeMore}
            className="dark:border-slate-800 px-3 bg-transparent hover:bg-transparent w-fit border py-2 text-base font-medium flex gap-2 rounded-[8px] border-slate-200 text-slate-500 dark:text-slate-400"
          >
            See more <ChevronDown height={16} width={16} />
          </Button>
        </>
      )}
      {projects.length !== 0 && isSeeMore && (
        <>
          <div className=" grid grid-cols-3 gap-x-6 gap-y-6 ">
            {[...featuredProjects, ...nonFeaturedProjects].map((project) => (
              <ProfileProject
                key={project.id}
                project={project}
                handleEditClick={handleEditClick}
              />
            ))}
          </div>
          <Button
            onClick={handleSeeMore}
            className="dark:border-slate-800 px-3 bg-transparent hover:bg-transparent w-fit border py-2 text-base font-medium flex gap-2 rounded-[8px] border-slate-200 text-slate-500 dark:text-slate-400"
          >
            Hide <ChevronUp height={16} width={16} />
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
