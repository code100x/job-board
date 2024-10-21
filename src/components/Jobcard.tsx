'use client';

import { Bookmark, Briefcase } from 'lucide-react';
import Image from 'next/image';
import Icon from './ui/icon';
import { formatSalary } from '@/lib/utils';
import { JobType } from '@/types/jobs.types';
import _ from 'lodash';
import { cn } from '@/lib/utils';
import { JobSkills } from './job-skills';
import { toggleBookmarkAction } from '@/actions/job.action';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useToast } from './ui/use-toast';
import { useRouter } from 'next/navigation';
import BookmarkCardSkeleton from './BookmarkCardSkeletion';

export default function JobCard({
  job,
  isBookmarked,
  className,
}: {
  job: JobType;
  isBookmarked: boolean;
  className?: string;
}) {
  const router = useRouter();
  const session = useSession();

  const [bookmarked, setBookmarked] = useState<boolean>(isBookmarked || false);

  const user = session.data?.user;

  const { toast } = useToast();

  async function handleBookmarkClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setBookmarked(true);
    try {
      const response = await toggleBookmarkAction(user?.id || '', job.id);
      if (response.status !== 200) throw new Error(response.message);
      setBookmarked(true);
      toast({
        variant: 'success',
        title: 'Bookmarked Successfully',
      });
    } catch (error) {
      setBookmarked(false);
      isBookmarked = false;

      toast({
        variant: 'destructive',
        title: (error as Error).message,
      });
    }
  }

  const handleCardClick = () => {
    router.push(`/jobs/${job.id}`);
  };

  return (
    <>
      {session.status === 'loading' ? (
        <BookmarkCardSkeleton />
      ) : (
        <div
          key={job.id}
          onClick={handleCardClick}
          className={cn(
            'min-h-[200px] sm:text-sm text-xs text-slate-500 dark:text-slate-400 font-medium flex flex-col border p-6 bg-slate-100 gap-4 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg cursor-pointer ',
            className
          )}
        >
          <div className="flex w-full justify-between">
            <div className="flex  gap-3">
              <div className="size-16 relative">
                {job.companyLogo && (
                  <Image
                    className="size-full object-contain "
                    src={job.companyLogo || ''}
                    width={'500'}
                    height={'500'}
                    alt="company-logo"
                  />
                )}
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="font-bold text-black dark:text-white text-xl">
                  {job.title}
                </h2>
                <div className="flex">
                  <p>{job.companyName + '.'} </p>
                  <p className="ml-2">
                    {'Posted on ' + job.postedAt.toDateString()}
                  </p>
                </div>
              </div>
            </div>

            <div>
              {session.status === 'authenticated' ? (
                <Bookmark
                  onClick={handleBookmarkClick}
                  className={`cursor-pointer ${bookmarked ? 'fill-white' : ''}`}
                />
              ) : null}
            </div>
          </div>
          <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
            <div className="p-2 bg-blue-100 dark:bg-blue-500 dark:bg-opacity-10 bg-opacity-90 text-blue-500 dark:text-blue-400 rounded">
              {_.startCase(job.type)}
            </div>
            <span className="flex items-center gap-0.5">
              {job.minSalary && job.maxSalary ? (
                <span className="flex justify-start items-center gap-1 flex-nowrap bg-green-900/90 px-2 py-1 rounded-full text-white">
                  <Icon icon="currency" size={12} />
                  {`${formatSalary(job.minSalary)}-${formatSalary(job.maxSalary)}`}
                </span>
              ) : (
                'Not disclosed'
              )}
            </span>
            <span className="flex items-center gap-0.5">
              {job.minExperience && job.maxExperience ? (
                <span className="flex justify-start items-center gap-1 flex-nowrap">
                  <Briefcase size={12} />

                  {`${job.minExperience}-${job.maxExperience} Yrs`}
                </span>
              ) : (
                'Ex: Not disclosed'
              )}
            </span>

            <span className="flex items-center gap-0.5">
              <Icon icon="location" size={12} />
              {job.city} -
              <span className=" dark:bg-opacity-10 bg-opacity-90 text-blue-500 dark:text-blue-400 rounded capitalize">
                {job.workMode}
              </span>
            </span>
          </div>
          <div className="flex flex-wrap gap-2 max-w-[70%]">
            <JobSkills skills={job.skills} />
          </div>
        </div>
      )}
    </>
  );
}
