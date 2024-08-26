import AllJobs from '@/components/all-jobs';
import { FilterSheet } from '@/components/FilterSheet';
import Loader from '@/components/loader';
import APP_PATHS from '@/config/path.config';
import { Button } from '@/components/ui/button';
import JobFilters from '@/layouts/job-filters';
import JobsHeader from '@/layouts/jobs-header';
import { JobQuerySchemaType } from '@/lib/validators/jobs.validator';
import { Suspense } from 'react';
const page = async ({ searchParams }: { searchParams: JobQuerySchemaType }) => {
  return (
    <div className="container flex gap-5 pt-10">
      <div className="container flex gap-5 pt-5">
        <div className="max-md:hidden">
          <JobFilters searchParams={searchParams} baseUrl={APP_PATHS.JOBS} />
        </div>
        <div className="grow">
          <div className="flex space-x-2">
            <div className="md:hidden">
              <FilterSheet searchParams={searchParams} baseUrl={APP_PATHS.JOBS}>
                <Button>Filters</Button>
              </FilterSheet>
            </div>
            <div className="flex-grow">
              <JobsHeader
                searchParams={searchParams}
                baseUrl={APP_PATHS.JOBS}
              />
            </div>
          </div>
          <Suspense
            fallback={
              <div className="flex justify-center items-center h-full gap-5 ">
                <Loader />
              </div>
            }
          >
            <AllJobs searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default page;
