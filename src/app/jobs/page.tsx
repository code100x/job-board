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
    <div className="container flex gap-5 pt-5 mt-10">
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
  );
};

export default page;
