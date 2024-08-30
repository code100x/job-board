import { getAllJobs } from '@/actions/job.action';
import { formatSalary } from '@/lib/utils';
import Link from 'next/link';
import JobCardLoader from '@/components/job-card-loader';

import { DEFAULT_PAGE, JOBS_PER_PAGE } from '@/config/app.config';
import JobsHeader from '@/layouts/jobs-header';
import { Suspense } from 'react';
import { JobQuerySchemaType } from '@/lib/validators/jobs.validator';
import { Pagination, PaginationContent, PaginationItem } from './ui/pagination';
import {
  PaginationNextButton,
  PaginationPreviousButton,
} from './pagination-client';
import { PaginationPages } from './ui/paginator';
import APP_PATHS from '@/config/path.config';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export const calculateTimeSincePosted = (postedAt: Date): string => {
  return dayjs(postedAt).fromNow();
};

export const JobLanding = async ({
  searchParams,
}: {
  searchParams: JobQuerySchemaType;
}) => {
  return (
    <div className="max-w-screen-lg mx-auto grid grid-cols-1  gap-6 py-8 pt-10">
      <div className="grow  px-5">
        <JobsHeader searchParams={searchParams} baseUrl="/" />
        <Suspense fallback={<JobCardLoader />}>
          <JobCard searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
};

type PaginatorProps = {
  searchParams: JobQuerySchemaType;
};

const JobCard = async ({ searchParams }: PaginatorProps) => {
  const jobs = await getAllJobs(searchParams);
  if (!jobs.status) {
    return <div>Error {jobs.message}</div>;
  }

  const totalPages =
    Math.ceil((jobs.additional?.totalJobs || 0) / JOBS_PER_PAGE) ||
    DEFAULT_PAGE;
  const currentPage = parseInt(searchParams.page?.toString()) || DEFAULT_PAGE;
  return (
    <div className=" py-4 grid gap-3">
      {jobs.additional?.jobs.map((job) => {
        return (
          <Link key={job.id} href={`/jobs/${job.id}`}>
            <div
              className=" dark:bg-neutral-900  bg-background w-full flex flex-col md:flex-row md:items-center items-start gap-4 rounded-3xl border p-5 px-6 text-left text-sm transition-all hover:bg-accent"
              key={job.id}
            >
              <div>
                {/* todo:replace with original jobImage */}
                <div className="w-24 h-24 bg-neutral-200 dark:bg-neutral-800 rounded-2xl flex justify-center items-center">
                  {/* <Image
                  src={''}
                  alt="job image"
                  width={70}
                  height={70}
                  /> */}
                </div>
              </div>
              <div className="flex w-full flex-col gap-6 ">
                <p className="font-semibold text-xl sm:text-2xl ">
                  {job.title} - {job.companyName}
                </p>
                <p className="font-medium text-sm  text-neutral-500 ">
                  {calculateTimeSincePosted(job.postedAt)} • {job.workMode}
                </p>
              </div>

              <div className="">
                <span className="flex justify-between items-center gap-0.5  text-3xl overflow-hidden">
                  {/* {job.minSalary && <Icon icon="currency" size={35} />} */}
                  {job.minSalary && job.maxSalary
                    ? `$${formatSalary(job.maxSalary)}`
                    : 'NotDisclosed'}
                </span>
                <p className=" md:text-right text-xs text-muted-foreground mt-1">
                  per annum
                </p>
              </div>
            </div>
          </Link>
        );
      })}
      <Pagination>
        <PaginationContent>
          {totalPages ? (
            <PaginationItem>
              <PaginationPreviousButton
                searchParams={searchParams}
                currentPage={currentPage}
                baseUrl={APP_PATHS.HOME}
              />
            </PaginationItem>
          ) : null}
          <PaginationPages
            searchParams={searchParams}
            currentPage={currentPage}
            totalPages={totalPages}
            baseUrl={APP_PATHS.HOME}
          />
          {totalPages ? (
            <PaginationItem>
              <PaginationNextButton
                searchParams={searchParams}
                currentPage={currentPage}
                totalPages={totalPages}
                baseUrl={APP_PATHS.HOME}
              />
            </PaginationItem>
          ) : null}
        </PaginationContent>
      </Pagination>
    </div>
  );
};
