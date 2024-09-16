import AllJobs from '@/components/all-jobs';
import { FilterSheet } from '@/components/FilterSheet';
import Loader from '@/components/loader';
import { Button } from '@/components/ui/button';
import JobFilters from '@/layouts/job-filters';
import JobsHeader from '@/layouts/jobs-header';
import {
  JobQuerySchema,
  JobQuerySchemaType,
} from '@/lib/validators/jobs.validator';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

const page = async ({ searchParams }: { searchParams: JobQuerySchemaType }) => {
  const parsedData = JobQuerySchema.safeParse(searchParams);
  if (!(parsedData.success && parsedData.data)) {
    console.error(parsedData.error);
    redirect('/jobs');
  }
  const parsedSearchParams = parsedData.data;
  return (
    <div className="container flex gap-5 pt-10">
      <div className="container flex gap-5 pt-5">
        <div className="max-md:hidden">
          <JobFilters searchParams={parsedSearchParams} />
        </div>
        <div className="grow">
          <div className="flex space-x-2">
            <div className="md:hidden">
              <FilterSheet searchParams={parsedSearchParams}>
                <Button>Filters</Button>
              </FilterSheet>
            </div>
            <div className="flex-grow">
              <JobsHeader searchParams={searchParams} />
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
