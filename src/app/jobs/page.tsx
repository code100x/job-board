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
    <div className="container relative grid sm:gap-6 gap-4 mt-12">
      <div className="grid gap-2">
        <h1 className="text-3xl sm:text-4xl font-bold">Explore Jobs</h1>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
          Explore thousands of remote and onsite jobs that match your skills and
          aspirations.
        </p>
      </div>

      <div className="flex gap-6">
        <div className="hidden w-[310px] rounded-lg sm:block border h-[calc(100vh-100px)] overflow-y-auto scrollbar-custom sticky top-[5.5rem]">
          <div className=" ">
            <JobFilters searchParams={parsedSearchParams} />
          </div>
        </div>

        <div className="grow flex flex-col bg-background">
          <div className="sticky top-[4.5rem] bg-background dark:bg-background z-10 py-4">
            <JobsHeader searchParams={parsedSearchParams} />
          </div>

          <div className="grow bg-background">
            <Suspense
              key={JSON.stringify(parsedSearchParams)}
              fallback={
                <div className="flex justify-center items-center h-full gap-5">
                  <Loader />
                </div>
              }
            >
              <AllJobs searchParams={parsedSearchParams} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
