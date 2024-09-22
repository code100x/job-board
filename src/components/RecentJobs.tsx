import { getRecentJobs } from '@/actions/job.action';
import { calculateTimeSincePosted, getFirstLetterCaps } from './job-landing';
import Image from 'next/image';
import { formatSalary } from '@/lib/utils';
import { Briefcase, MapPin } from 'lucide-react';

export default async function RecentJobs() {
  const recentJobs = await getRecentJobs();
  if (!recentJobs.status) {
    return <div>{recentJobs.message}</div>;
  }

  return (
    <div className="w-full grid md:grid-cols-3 grid-cols-1 gap-2 items-center mt-10">
      {recentJobs.additional.recentJobs.map((job, i) => (
        <div
          key={i}
          className="md:max-w-[420px] md:min-w-[400px] min-w-[250px] w-full min-h-[200px] h-auto flex flex-col mx-auto my-2 gap-3 cursor-pointer dark:bg-[#0F172A] border bg-[#F1F5F9] dark:border-[#1E293B] border-[#E2E8F0] rounded-xl md:p-5 p-3 dark:hover:bg-[#111a2f] hover:bg-[#ebf1f7] duration-200 transition ease-in-out"
        >
          <div className="w-full flex items-center">
            {job.companyLogo ? (
              <div className="w-12 h-12 rounded-full flex items-center justify-center border-none ouline-none ">
                <Image
                  className="w-12 h-12"
                  src={job.companyLogo}
                  alt="company-logo"
                />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-full flex items-center justify-center  ouline-none dark:bg-[#0F172A] dark:text-white bg-slate-200 border">
                <p className="font-semibold">
                  {getFirstLetterCaps(job.companyName)}
                </p>
              </div>
            )}
            <div className="flex flex-col items-start justify-center px-2 mt-2">
              <p className="font-semibold text-lg dark:text-[#F8FAFC] text-[#020817]">
                {job.title}
              </p>
              <div className="flex items-center text-[#64748B] dark:text-[#94A3B8]">
                <p className="py-1 text-sm  font-medium">{job.companyName}</p>
                <p className="py-1 text-sm  font-medium flex items-center">
                  <span className="px-1">&#x2022;</span>
                  {calculateTimeSincePosted(job.postedAt)}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center my-2 justify-start font-medium md:text-sm text-xs text-nowrap">
            <p className="rounded-lg py-1 px-2 bg-[#3B82F61A] text-[#4E7AFF] ">
              {job.type}
            </p>
            <div className="flex items-center mx-3 dark:text-[#94A3B8] text-[#64748B]">
              <Briefcase className="w-4 h-4" />
              <p className="pl-1">2-3 Yrs</p>
            </div>
            <p className="dark:text-[#94A3B8] text-[#64748B] md:text-base text-sm">
              {job.maxSalary ? `$${formatSalary(job.maxSalary)}` : '$$$$$'}
            </p>
            <div className="flex items-center mx-3  dark:text-[#94A3B8] text-[#64748B]">
              <MapPin className="w-4 h-4" />
              <p className="pl-1 overflow-ellipsis">{job.city}</p>
            </div>
          </div>
          <div className="flex flex-wrap justify-start mt-1">
            {['Git', 'Aws', 'Javascript', 'Nodejs', 'Python', 'Typescript'].map(
              (data, i) => (
                <p
                  key={i}
                  className="w-fit rounded-full py-2 px-3 md:text-sm text-xs dark:text-[#94A3B8] text-[#64748B] dark:bg-[#64748B1A] bg-[#64748B1A] mx-1 my-1 flex items-center justify-center font-medium "
                >
                  {data}
                </p>
              )
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
