import { AlertCircle, Briefcase } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Icon from './ui/icon';
import { formatSalary } from '@/lib/utils';
import { JobType } from '@/types/jobs.types';
import _ from 'lodash';
import { cn } from '@/lib/utils';
export default function JobCard({
  job,
  className,
}: {
  job: JobType;
  className?: string;
}) {
  return (
    <Link
      key={job.id}
      href={`/jobs/${job.id}`}
      className={cn(
        'min-h-[200px] overflow-y-scroll sm:text-sm text-xs text-slate-500 dark:text-slate-400 font-medium flex flex-col border p-6 bg-slate-100 gap-4 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg ',
        className
      )}
    >
      <div className="flex w-full gap-3">
        <div className="size-16 relative">
          {job.companyLogo ? (
            job.companyLogo === 'https://www.example.com' ? (
              <div className=" w-full h-full flex items-center justify-center rounded-md">
                <Image
                  src={'/main.svg'}
                  width={500}
                  height={500}
                  alt="company-logo"
                />
              </div>
            ) : (
              <Image
                className="size-full object-cover "
                src={job.companyLogo || ''}
                width={'500'}
                height={'500'}
                alt="company-logo"
              />
            )
          ) : null}
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-black dark:text-white text-xl">
            {job.title}
          </h1>
          <div className="flex">
            <p>{job.companyName + '.'} </p>
            <p className="ml-2">{'Posted on ' + job.postedAt.toDateString()}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
        <div className="p-2 bg-blue-100 dark:bg-blue-500 dark:bg-opacity-10 bg-opacity-90 text-blue-500 dark:text-blue-400 rounded">
          {_.startCase(job.type)}
        </div>
        <span className="flex items-center gap-0.5">
          {job.minExperience && <Briefcase size={12} />}
          {job.minExperience && job.maxExperience
            ? `${job.minExperience}-${job.maxExperience} Yrs`
            : 'Not disclosed'}
        </span>
        <span className="flex items-center gap-0.5">
          {job.minSalary && <Icon icon="currency" size={12} />}
          {job.minSalary && job.maxSalary
            ? `${formatSalary(job.minSalary)}-${formatSalary(job.maxSalary)}`
            : 'Not disclosed'}
        </span>
        <span className="flex items-center gap-0.5">
          <Icon icon="location" size={12} />
          {job.address}
          <span className="capitalize">({job.workMode})</span>
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {job.skills && job.skills.length !== 0 ? (
          !(job.skills.length > 4) ? (
            // If there are more than 3 skills, show them all
            job.skills.map((item, index) => (
              <div
                key={index}
                className="bg-slate-500 bg-opacity-10 text-slate-500 dark:text-slate-400 font-medium text-sm rounded-full px-2"
              >
                {item}
              </div>
            ))
          ) : (
            job.skills.slice(0, 7).map((item, index) => (
              <div
                key={index}
                className="bg-slate-500 bg-opacity-10 text-slate-500 dark:text-slate-400 font-medium text-sm rounded-full px-2"
              >
                {item}
              </div>
            ))
          )
        ) : (
          // If there are no skills, show the "No skills provided" message
          <div className="mt-3 bg-slate-500 flex justify-start items-center gap-3 bg-opacity-10 text-slate-500 dark:text-slate-400 font-medium text-sm rounded-full px-2">
            <AlertCircle size={12} /> No skills provided
          </div>
        )}
      </div>
    </Link>
  );
}
