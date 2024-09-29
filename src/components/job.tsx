import { JobType } from '@/types/jobs.types';
import Icon from './ui/icon';
import { formatSalary } from '@/lib/utils';
import { Button } from './ui/button';
import Image from 'next/image';
import { MapPin, Share2 } from 'lucide-react';
import Linkify from 'linkify-react';
const options = {
  defaultProtocol: 'https',
  target: '_blank',
};
export const Job = ({ job }: { job: JobType }) => {
  return (
    <aside className="col-span-1 flex flex-col gap-6 lg:col-span-4">
      <section className="grid gap-5 border-2 shadow-sm p-6 w-full bg-gradient-to-b from-[#F1F5F9] to-white dark:from-darkBgSecondary dark:to-darkBgTertiary rounded-lg">
        <div className="flex gap-4 items-center">
          <div className="w-[4rem] h-[4rem] bg-primary/20 rounded-md">
            {job.companyLogo && (
              <Image
                className="size-full object-cover dark:invert"
                src={job.companyLogo || ''}
                width={'500'}
                height={'500'}
                alt="company-logo"
              />
            )}
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-2xl">{job.title}</h3>
            <div className="text-xs flex gap-1 font-medium items-center text-gray-500">
              <span>{job.companyName}</span>•
              <span>{'Posted on ' + job.postedAt.toDateString()}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="px-4 py-1 w-fit text-blue-500 bg-blue-500/20 rounded-lg flex items-center justify-center text-xs md:text-sm font-bold">
            {job.type && job.type.toUpperCase()}
          </div>

          <span className="flex bg-green-500/20 font-bold rounded-lg px-4 py-1 text-green-500 text-xs md:text-sm items-center gap-0.5">
            {job.minSalary && <Icon icon="currency" size={16} />}
            {job.minSalary && job.maxSalary
              ? `${formatSalary(job.minSalary)}-${formatSalary(job.maxSalary)}`
              : 'Not disclosed'}
          </span>

          <div className="flex items-center gap-2">
            <MapPin size={16} />
            <p className="text-xs md:text-sm font-semibold">{job.address}</p>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <Button className="justify-self-start px-6 dark:text-white py-2 w-fit h-fit">
            Apply Now
          </Button>
          <Button
            className="justify-self-start flex gap-2 items-center"
            variant={'link'}
          >
            <Share2 size={16} /> Share Job
          </Button>
        </div>
      </section>

      {/* job description */}
      <section className="border-2 bg-[#F1F5F9] dark:bg-[#0F172A] h-[10rem] p-6 rounded-xl">
        <Linkify options={options}>
          <p>{job.description}</p>
        </Linkify>
      </section>

      {/* about company */}
      <section className="border-2 bg-[#F1F5F9] dark:bg-[#0F172A] h-[10rem] p-6 rounded-xl">
        <h1 className="font-bold">About {job.companyName}</h1>
        <p className="my-4 text-sm text-gray-500">{job.description}</p>
      </section>
    </aside>
  );
};
