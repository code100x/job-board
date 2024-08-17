import AllJobs from '@/components/all-jobs';
import Loader from '@/components/loader';
import JobFilters from '@/layouts/job-filters';
import JobsHeader from '@/layouts/jobs-header';
import { JobQuerySchemaType } from '@/lib/validators/jobs.validator';
import { Suspense } from 'react';
const page = async ({ searchParams }: { searchParams: JobQuerySchemaType }) => {
  return (
    <div className="container flex gap-5 pt-5">
      <JobFilters searchParams={searchParams} />
      <div className="grow">
        <JobsHeader searchParams={searchParams} />
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
