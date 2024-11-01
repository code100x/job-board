import { ProjectType } from '@/types/user.types';
import Image from 'next/image';
import React from 'react';
import { ProjectDeleteDialog } from './projectDeleteDialog';
import { Button } from '../ui/button';
import { ArrowUpRight, Github, Pencil } from 'lucide-react';
import Link from 'next/link';

const ProfileProject = ({
  project,
  handleEditClick,
  isOwner,
}: {
  project: ProjectType;
  handleEditClick: (project: ProjectType) => void;
  isOwner: boolean;
}) => {
  return (
    <div
      key={project.id}
      className=" flex flex-col gap-y-6 p-3 sm:p-6 dark:bg-slate-900 bg-slate-100 rounded-2xl"
    >
      <div className="relative w-full aspect-w-16 h-48 rounded-[8px] overflow-hidden">
        <Image
          src={project.projectThumbnail || ''}
          alt="project-image"
          className="object-cover"
          fill
          priority
          sizes="16:9"
        />
      </div>
      <div className="flex gap-y-3 flex-col">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold truncate">{project.projectName}</h2>
          {isOwner && (
            <div className="flex gap-3 items-center w-fit">
              <ProjectDeleteDialog projectId={project.id} />
              <Button
                className="bg-transparent p-0 b-0 hover:bg-transparent"
                onClick={() => handleEditClick(project)}
              >
                <Pencil
                  width={16}
                  height={16}
                  className="dark:text-slate-400 text-slate-500"
                />
              </Button>
            </div>
          )}
        </div>
        <p className="text-slate-500 dark:text-slate-400 font-medium text-sm leading-tight">
          {project.projectSummary}
        </p>
        <div className="bg-slate-500 bg-opacity-10 px-3 py-1 text-slate-500 dark:text-slate-400 w-fit text-sm rounded-[8px]">
          {project.stack}
        </div>
      </div>
      <div className="flex gap-2 flex-wrap">
        {project.projectLiveLink && (
          <Link
            target="_blank"
            href={project.projectLiveLink}
            className="w-fit flex gap-2 text-base items-center bg-white border border-slate-200 px-3 py-2 rounded-[8px] text-slate-500 dark:text-slate-400 dark:bg-[#020817] dark:border-slate-800"
          >
            View Project <ArrowUpRight height={16} width={16} />
          </Link>
        )}
        {project.projectGithub && (
          <Link
            target="_blank"
            href={project.projectGithub}
            className="w-fit text-base flex gap-2 items-center border-none px-3 py-2 rounded-[8px] text-slate-500 dark:text-slate-400"
          >
            <Github
              height={16}
              width={16}
              className="dark:fill-slate-400 fill-slate-500"
            />{' '}
            View
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProfileProject;
