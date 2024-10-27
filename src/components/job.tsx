'use client';
import { JobType } from '@/types/jobs.types';
import Icon from './ui/icon';
import { formatSalary } from '@/lib/utils';
import { Button } from './ui/button';
import Image from 'next/image';
import { Briefcase, MapPin } from 'lucide-react';
import Link from 'next/link';
import Linkify from 'linkify-react';
import { ShareJobDialog } from './ShareJobDialog';
const options = {
  defaultProtocol: 'https',
  target: '_blank',
};
export const Job = ({ job }: { job: JobType }) => {
  return (
    <aside className="col-span-1 flex flex-col gap-6 lg:col-span-4 ">
      <section className="grid gap-5 border-2 shadow-sm p-6 w-full bg-gradient-to-b from-[#F1F5F9] to-white dark:from-darkBgSecondary dark:to-darkBgTertiary rounded-lg">
        <div className="flex gap-4 items-center">
          <div className="w-[4rem] h-[4rem]  rounded-md">
            {job.companyLogo && (
              <Image
                className="size-full object-cover "
                src={job.companyLogo || ''}
                width={'500'}
                height={'500'}
                alt="company-logo"
              />
            )}
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-2xl">{job.title}</h1>
            <div className="text-xs flex gap-1 font-medium items-center text-gray-500">
              <span>{job.companyName}</span>•
              <span>{'Posted on ' + job.postedAt.toDateString()}</span>
            </div>
          </div>
        </div>
        <div className=" flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="px-4 py-1 w-fit text-blue-500 bg-blue-500/20 rounded-lg flex items-center justify-center text-xs md:text-sm font-bold">
              {job.type && job.type.toUpperCase().replace('_', ' ')}
            </div>

            <span className="flex bg-green-500/20 font-bold rounded-lg px-4 py-1 text-green-500 text-xs md:text-sm items-center gap-0.5">
              <Icon icon="currency" size={16} />
              {job.minSalary && job.maxSalary
                ? `${formatSalary(job.minSalary)}-${formatSalary(job.maxSalary)}`
                : 'Not disclosed'}
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

            <span className="flex justify-center items-center gap-2">
              <MapPin size={16} />
              <p className="text-xs md:text-sm font-semibold">{job.address}</p>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-full md:max-w-[80%] flex-wrap flex justify-start items-center gap-2">
            {job.skills.map((skill, index) => {
              return (
                <span
                  key={`job_skill_${index}`}
                  className=" bg-gray-700/20 text-gray-600 dark:bg-gray-500/20 font-bold rounded-lg px-4 py-1 dark:text-gray-300 text-xs items-center gap-0.5"
                >
                  {skill}
                </span>
              );
            })}
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <Link href={job.application ? job.application : ''}>
            <Button
              className="justify-self-start px-6 dark:text-white py-2 w-fit h-fit"
              aria-label="apply-now"
            >
              Apply Now
            </Button>
          </Link>
          <ShareJobDialog job={job} />
        </div>
      </section>

      {/* job description */}
      <section className="border-2 bg-[#F1F5F9] dark:bg-[#0F172A] h-auto max-h-[20rem] overflow-y-auto p-6 rounded-xl">
        <h2 className="font-extrabold px-4 py-1 w-fit text-white bg-blue-500 dark:bg-opacity-20 rounded-lg text-xl ">
          Job Description
        </h2>
        <Linkify options={options}>
          <div
            className="my-4 dark:text-neutral-100"
            dangerouslySetInnerHTML={{ __html: job.description ?? '' }}
          ></div>
        </Linkify>
      </section>

      {/* about company */}
      <section className="border-2 bg-[#F1F5F9] dark:bg-[#0F172A] h-auto max-h-[15rem] overflow-y-auto p-6 rounded-xl">
        <h2 className="font-extrabold px-4 py-1 w-fit text-white bg-blue-500 dark:bg-opacity-20 rounded-lg text-xl ">
          About {job.companyName}
        </h2>
        <div
          dangerouslySetInnerHTML={{ __html: job.companyBio ?? '' }}
          className="my-4 dark:text-neutral-200"
        ></div>
      </section>
    </aside>
  );
};
