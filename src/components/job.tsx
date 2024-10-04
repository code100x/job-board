'use client';
import { JobType } from '@/types/jobs.types';
import Icon from './ui/icon';
import { formatSalary } from '@/lib/utils';
import { Button } from './ui/button';
import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { Twitter } from 'lucide-react';
import Linkify from 'linkify-react';
const options = {
  defaultProtocol: 'https',
  target: '_blank',
};
export const Job = ({ job }: { job: JobType }) => {
  const shareOnTwitter = () => {
    const tweetText = encodeURIComponent(
      'I just read an amazing blog post! Check it out:'
    );
    const tweetUrl = encodeURIComponent(window.location.href);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${tweetText}&url=${tweetUrl}`;
    window.open(twitterUrl, '_blank');
  };

  return (
    <aside className="col-span-1 flex flex-col gap-6 lg:col-span-4 ">
      <section className="grid gap-5 border-2 shadow-sm p-6 w-full bg-gradient-to-b from-[#F1F5F9] to-white dark:from-darkBgSecondary dark:to-darkBgTertiary rounded-lg">
        <div className="flex gap-4 items-center">
          <div className="w-[4rem] h-[4rem]  rounded-md">
            {job.companyLogo ? (
              job.companyLogo === 'https://www.example.com' ? (
                <div className="bg-gray-200 w-full h-full flex items-center justify-center rounded-md">
                  hi
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
            <h3 className="font-bold text-2xl">{job.title}</h3>
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
              {!!job.minSalary && <Icon icon="currency" size={16} />}
              {job.minSalary && job.maxSalary
                ? `${formatSalary(job.minSalary)}-${formatSalary(job.maxSalary)}`
                : 'Not disclosed'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <MapPin size={16} />
          <p className="text-xs md:text-sm font-semibold">{job.address}</p>
          <div className="w-full md:max-w-[60%] flex-wrap flex justify-start items-center gap-2">
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
          <Button className="justify-self-start px-6 dark:text-white py-2 w-fit h-fit">
            Apply Now
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 py-4 px-6"
            onClick={shareOnTwitter}
          >
            Share on <Twitter size={16} />
          </Button>
        </div>
      </section>

      {/* job description */}
      <section className="border-2 bg-[#F1F5F9] dark:bg-[#0F172A] h-auto max-h-[20rem] overflow-y-auto p-6 rounded-xl">
        <h1 className="font-extrabold px-4 py-1 w-fit text-white bg-blue-500/20 rounded-lg text-xl ">
          Job Description
        </h1>
        <Linkify options={options}>
          <div
            className="my-4 text-neutral-100"
            dangerouslySetInnerHTML={{ __html: job.description ?? '' }}
          ></div>
        </Linkify>
      </section>

      {/* about company */}
      <section className="border-2 bg-[#F1F5F9] dark:bg-[#0F172A] h-auto max-h-[15rem] overflow-y-auto p-6 rounded-xl">
        <h1 className="font-extrabold px-4 py-1 w-fit text-white bg-blue-500/20 rounded-lg text-xl ">
          About {job.companyName}
        </h1>
        <div
          dangerouslySetInnerHTML={{ __html: job.companyBio ?? '' }}
          className="my-4 text-neutral-200"
        ></div>
      </section>
    </aside>
  );
};
