import AllJobs from '@/components/all-jobs';
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
    <div className="container flex gap-5 pt-5">
      <JobFilters searchParams={parsedSearchParams} />
      <div className="grow">
        <JobsHeader searchParams={parsedSearchParams} />
        <Suspense fallback={<div>Loading...</div>}>
          <AllJobs searchParams={parsedSearchParams} />
        </Suspense>
      </div>
    </div>
  );
};

export default page;
