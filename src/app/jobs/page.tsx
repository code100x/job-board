import AllJobs from '@/components/all-jobs';
import Loader from '@/components/loader';
import APP_PATHS from '@/config/path.config';
import JobFilters from '@/layouts/job-filters';
import JobsHeader from '@/layouts/jobs-header';
import { JobQuerySchemaType } from '@/lib/validators/jobs.validator';
import { Suspense } from 'react';
const page = async ({ searchParams }: { searchParams: JobQuerySchemaType }) => {
  return (
    <div className="container flex gap-5 pt-10">
      <JobFilters searchParams={searchParams} baseUrl={APP_PATHS.JOBS} />
      <div className="grow">
        <JobsHeader searchParams={searchParams} baseUrl={APP_PATHS.JOBS} />
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
  );
};

export default page;
