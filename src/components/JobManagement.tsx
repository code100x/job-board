import React from 'react';
import { getAllJobs } from '@/actions/job.action';
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
    <div>
      <JobManagementTable jobs={jobs.additional} searchParams={searchParams} />
    </div>
  );
};
export default JobManagement;
