import { getAllJobs, GetUserBookmarksId } from '@/actions/job.action';
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

type PaginatorProps = {
  searchParams: JobQuerySchemaType;
};

const AllJobs = async ({ searchParams }: PaginatorProps) => {
  const [jobs, getUserBookmarks] = await Promise.all([
    await getAllJobs(searchParams),
    await GetUserBookmarksId(),
  ]);

  const userbookmarkArr: { jobId: string }[] | null = getUserBookmarks.data;

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
