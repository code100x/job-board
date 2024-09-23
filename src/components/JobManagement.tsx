import React from 'react';
import { getAllJobsForAdmin } from '@/actions/job.action';
import JobManagementHeader from './JobManagementHeader';
import JobManagementTable from './JobManagementTable';
import { JobQuerySchemaType } from '@/lib/validators/jobs.validator';

const JobManagement = async ({
  searchParams,
}: {
  searchParams: JobQuerySchemaType;
}) => {
  const jobs = await getAllJobsForAdmin(searchParams);
  if (!jobs.status) {
    return <div>Error {jobs.message}</div>;
  }
  return (
    <div className="pt-2 px-6 mt-10">
      <JobManagementHeader />
      <JobManagementTable
        jobs={jobs}
        searchParams={searchParams}
        initialJobs={jobs.additional?.jobs!!}
      />
    </div>
  );
};
export default JobManagement;
