import { getAllJobs } from '@/actions/job.action';
import { DEFAULT_PAGE, JOBS_PER_PAGE } from '@/config/app.config';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { JobQuerySchemaType } from '@/lib/validators/jobs.validator';
import {
  PaginationNextButton,
  PaginationPreviousButton,
} from './pagination-client';
import { Pagination, PaginationContent, PaginationItem } from './ui/pagination';
import { PaginationPages } from './ui/paginator';
import Icon from './ui/icon';
import { formatSalary } from '@/lib/utils';
import Link from 'next/link';
import APP_PATHS from '@/config/path.config';
import Image from 'next/image';
import _ from 'lodash';
type PaginatorProps = {
  searchParams: JobQuerySchemaType;
};

const AllJobs = async ({ searchParams }: PaginatorProps) => {
  const jobs = await getAllJobs(searchParams);
  if (!jobs.status || !jobs.additional) {
    return <div>Error {jobs.message}</div>;
  }
  const totalPages =
    Math.ceil((jobs.additional?.totalJobs || 0) / JOBS_PER_PAGE) ||
    DEFAULT_PAGE;
  const currentPage = parseInt(searchParams.page?.toString()) || DEFAULT_PAGE;
  return (
    <div className="bg-background py-4 grid gap-3 w-full">
      {jobs.additional.jobs.length > 0 ? (
        jobs.additional?.jobs.map((job) => {
          return (
            <Link
              key={job.id}
              href={`/jobs/${job.id}`}
              className="sm:text-sm text-xs text-slate-500 dark:text-slate-400 font-medium flex flex-col border p-6 bg-slate-100 gap-4 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg "
            >
              <div className="flex w-full gap-3">
                <div>
                  {/* Todo : replace with job.companyLogo */}
                  <Image
                    alt="company_logo"
                    src={'/spotify.png'}
                    width={48}
                    height={48}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className="font-bold text-black dark:text-white text-xl">
                    {job.title}
                  </h1>
                  <div className="flex">
                    <p>{job.companyName + '.'} </p>
                    <p className="ml-2">
                      {'Posted on ' + job.postedAt.toDateString()}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                <div className="p-2 bg-blue-100 dark:bg-blue-500 dark:bg-opacity-10 bg-opacity-90 text-blue-500 dark:text-blue-400 rounded">
                  {_.startCase(job.type)}
                </div>
                <span className="flex items-center gap-0.5">
                  <Icon icon="location" size={12} />
                  {job.address}
                  <span className="capitalize">({job.workMode})</span>
                </span>
                <span className="flex items-center gap-0.5">
                  {job.minSalary && <Icon icon="currency" size={12} />}
                  {job.minSalary && job.maxSalary
                    ? `${formatSalary(job.minSalary)}-${formatSalary(job.maxSalary)}`
                    : 'Not disclosed'}
                </span>
              </div>
            </Link>
          );
        })
      ) : (
        <Card className="mx-auto max-w-md w-full">
          <CardHeader>
            <CardTitle className="text-center">No Jobs Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground">
              Sorry, no job openings meet your requirements at the moment.
              Please check back later or adjust your search criteria.
            </p>
          </CardContent>
        </Card>
      )}
      <Pagination>
        <PaginationContent>
          {totalPages ? (
            <PaginationItem>
              <PaginationPreviousButton
                searchParams={searchParams}
                currentPage={currentPage}
                baseUrl={APP_PATHS.JOBS}
              />
            </PaginationItem>
          ) : null}
          <PaginationPages
            searchParams={searchParams}
            currentPage={currentPage}
            totalPages={totalPages}
            baseUrl={APP_PATHS.JOBS}
          />
          {totalPages ? (
            <PaginationItem>
              <PaginationNextButton
                searchParams={searchParams}
                currentPage={currentPage}
                totalPages={totalPages}
                baseUrl={APP_PATHS.JOBS}
              />
            </PaginationItem>
          ) : null}
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default AllJobs;
