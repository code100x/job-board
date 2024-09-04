import React from 'react';
import { getUserCreatedJob } from '@/actions/job.action';
import { getServerSession } from 'next-auth';
import { options } from '@/lib/auth';
import JobManagementHeader from './JobManagementHeader';
import JobManagementTable from './JobManagementTable';

const JobManagement = async () => {
  const session = await getServerSession(options);
  if (!session || !session.user) {
    return 'UnAuthorized Access!';
  }
  const id = session?.user.id;
  const jobs = await getUserCreatedJob({ id: id });
  if (!jobs.status) {
    return <div>Error {jobs.message}</div>;
  }
  return (
    <div className="pt-2 px-6 mt-10">
      <JobManagementHeader />
      <JobManagementTable jobs={jobs} />
    </div>
  );
};
export default JobManagement;
