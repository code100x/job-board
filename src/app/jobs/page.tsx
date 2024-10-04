import AllJobs from '@/components/all-jobs';
import Loader from '@/components/loader';
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
    <div className="container grid sm:gap-6 gap-4 mt-12">
      <div className="grid gap-2">
        <h1 className="text-3xl sm:text-4xl font-bold">Explore Jobs</h1>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
          Explore thousands of remote and onsite jobs that match your skills and
          aspirations.
        </p>
      </div>
      <div className="flex gap-6">
        <div className="hidden sm:block border  h-fit rounded-lg w-[310px] ">
          <JobFilters searchParams={parsedSearchParams} />
        </div>
        <div className="grow">
          <JobsHeader searchParams={parsedSearchParams} />
          <Suspense
            key={JSON.stringify(parsedSearchParams)}
            fallback={
              <div className="flex justify-center items-center h-full gap-5 ">
                <Loader />
              </div>
            }
          >
            <AllJobs searchParams={parsedSearchParams} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default page;
