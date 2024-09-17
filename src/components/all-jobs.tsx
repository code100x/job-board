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
            <Link key={job.id} href={`/jobs/${job.id}`}>
              <div
                className="w-[94%] mx-auto flex flex-col items-start gap-4 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent"
                key={job.id}
              >
                <div className="flex w-full flex-col gap-2">
                  <p className="font-semibold">{job.title}</p>
                  <p className="text-xs font-medium">{job.companyName}</p>
                </div>
                <div className="flex gap-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-0.5">
                    <Icon icon="location" size={12} />
                    {job.address}{' '}
                    <span className="capitalize">({job.workMode})</span>
                  </span>
                  <span className="flex items-center gap-0.5">
                    {job.minSalary && <Icon icon="currency" size={12} />}
                    {job.minSalary && job.maxSalary
                      ? `${formatSalary(job.minSalary)}-${formatSalary(job.maxSalary)}`
                      : 'Not disclosed'}
                  </span>
                </div>
                <p className="flex gap-0.5 items-center text-muted-foreground text-xs">
                  <Icon icon="description" size={12} />
                  <span>{job.description}</span>
                </p>
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
