'use client';
import { GetUserBookmarksId, getAllJobs } from '@/actions/job.action';
import { DEFAULT_PAGE, JOBS_PER_PAGE } from '@/config/app.config';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { JobQuerySchemaType } from '@/lib/validators/jobs.validator';
import {
  PaginationNextButton,
  PaginationPreviousButton,
} from './pagination-client';
import { Pagination, PaginationContent, PaginationItem } from './ui/pagination';
import { PaginationPages } from './ui/paginator';
import JobCard from './Jobcard';
import APP_PATHS from '@/config/path.config';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

type PaginatorProps = {
  searchParams: JobQuerySchemaType;
};

const AllJobs = ({ searchParams }: PaginatorProps) => {
  // const userbookmarkArr: { jobId: string }[] | null = userbookmarks;
  const session = useSession();

  const userbookmark = useQuery({
    queryKey: ['UserBookmarksId', session?.data?.user?.id],
    queryFn: () => GetUserBookmarksId(),
  });

  const { data } = useQuery({
    queryKey: ['jobs', searchParams],
    queryFn: () => getAllJobs(searchParams),
    staleTime: 1000 * 60 * 5,
  });
  if (!data?.status || !data?.additional) {
    return <div>Error {data?.message}</div>;
  }
  const jobs = data;
  const userbookmarkArr: { jobId: string }[] | null =
    userbookmark.data?.data || null;

  const totalPages =
    Math.ceil((jobs.additional?.totalJobs || 0) / JOBS_PER_PAGE) ||
    DEFAULT_PAGE;
  const currentPage = parseInt(searchParams.page?.toString()) || DEFAULT_PAGE;
  const jobsLength = jobs.additional?.jobs.length || 0; // Defaults to 0 if undefined
  return (
    <div className="bg-background py-4 grid gap-3 w-full">
      {jobsLength > 0 ? (
        jobs.additional?.jobs.map((job, index) => (
          <JobCard
            job={job}
            key={index}
            isBookmarked={
              userbookmarkArr?.some((e) => e.jobId === job.id) || false
            }
          />
        ))
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
