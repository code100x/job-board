"use client"
import { JobType } from '@/types/jobs.types';
import Icon from './ui/icon';
import { formatSalary } from '@/lib/utils';
import { Button } from './ui/button';
import {  formatDistanceToNow } from 'date-fns';
export const Job = ({ job }: { job: JobType }) => {
  
 
  
  return (
    <section className="flex flex-col items-center gap-5 border p-3 rounded-lg">
      <div className="flex gap-2 flex-col items-center">
        <p className="text-xl text-primary/80">{job.companyName}</p>
        <p className="font-bold text-2xl ">{job.title}</p>
        <div className="flex flex-col items-center gap-2 mt-3">
          <span className="flex gap-0.5 items-center">
            <Icon icon="location" size={12} />
            {job.workMode}
          </span>
          <div className="flex items-center gap-0.5">
            {job.minSalary && <Icon icon="currency" size={12} />}
            {job.minSalary && job.maxSalary
              ? `${formatSalary(job.minSalary)}-${formatSalary(job.maxSalary)}`
              : 'Not disclosed'}
          </div>
          <p className="job-posted-time">
          {formatDistanceToNow(job.postedAt, { addSuffix: true })}
          </p>
        </div>
      </div>
      <Button className="justify-self-start rounded-lg">Apply</Button>
      <p>{job.description}</p>
    </section>
  );
};
