import React from 'react';
import { getAllJobs } from '@/actions/job.action';
import JobManagementHeader from './JobManagementHeader';
import JobManagementTable from './JobManagementTable';
import { JobQuerySchemaType } from '@/lib/validators/jobs.validator';

const JobManagement = async ({
  searchParams,
}: {
  searchParams: JobQuerySchemaType;
}) => {
  const jobs = await getAllJobs(searchParams);
  if (!jobs.status) {
    return <div>Error {jobs.message}</div>;
  }
  return (
    <div className="pt-2 px-6 mt-10">
      <JobManagementHeader />
      <JobManagementTable jobs={jobs} searchParams={searchParams} />
    </div>
  );
};
export default JobManagement;
