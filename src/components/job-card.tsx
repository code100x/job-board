import { JobType } from '@/types/jobs.types';
import React from 'react';
import Image from 'next/image';
import { MapPin } from 'lucide-react';
import Link from 'next/link';
import _ from 'lodash';

export default function JobCard({ job }: { job: JobType }) {
  return (
    <Link href={`/jobs/${job.id}`}>
      {/* job card */}
      <div className="border-2 transition-all duration-115 ease-linear hover:bg-lightBgSecondary dark:hover:bg-darkBgSecondary flex flex-col gap-6 h-fit max-h-[10rem] p-4 rounded-xl">
        <div className="flex gap-4 items-center">
          <div className="w-[4rem] h-[4rem]  rounded-md">
            {job.companyLogo && (
              <Image
                className="size-full object-contain"
                src={job.companyLogo || ''}
                width={'500'}
                height={'500'}
                alt="company-logo"
              />
            )}
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="font-bold">{job.title}</h2>
            <div className="text-xs flex gap-1 font-medium items-center text-gray-500">
              <span>{job.companyName}</span>•
              <span>{'Posted on ' + job.postedAt.toDateString()}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-4 py-1 w-fit text-blue-500 bg-blue-500/20 rounded-lg flex items-center justify-center text-xs font-bold">
            {job.type && job?.type.toUpperCase().replace('_', ' ')}
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} />
            <p className="text-xs font-semibold">
              {job.address} ({_.startCase(job.workMode)})
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
