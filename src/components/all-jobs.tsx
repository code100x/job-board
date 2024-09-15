import { getAllJobs } from '@/actions/job.action';
import { DEFAULT_PAGE, JOBS_PER_PAGE } from '@/config/app.config';
import APP_PATHS from '@/config/path.config';
import { JobQuerySchemaType } from '@/lib/validators/jobs.validator';
import JobsCard from './JobsCard';
import {
  PaginationNextButton,
  PaginationPreviousButton,
} from './pagination-client';
import { Pagination, PaginationContent, PaginationItem } from './ui/pagination';
import { PaginationPages } from './ui/paginator';
type PaginatorProps = {
  searchParams: JobQuerySchemaType;
};

const AllJobs = async ({ searchParams }: PaginatorProps) => {
  const jobs = await getAllJobs(searchParams);
  if (!jobs.status) {
    return <div>Error {jobs.message}</div>;
  }
  const totalPages =
    Math.ceil((jobs.additional?.totalJobs || 0) / JOBS_PER_PAGE) ||
    DEFAULT_PAGE;
  const currentPage = parseInt(searchParams.page?.toString()) || DEFAULT_PAGE;
  return (
    <div className="bg-background py-4 grid gap-3 w-full">
      {jobs.additional?.jobs.map((job) => {
        return (
          <JobsCard
            key={job.id}
            id={job.id}
            title={job.title}
            companyName={job.companyName}
            address={job.address}
            workMode={job.workMode}
            minSalary={job.minSalary}
            maxSalary={job.maxSalary}
            description={job.description}
          />
        );
      })}
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
