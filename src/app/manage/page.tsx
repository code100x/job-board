import JobManagement from '@/components/JobManagement';
import { options } from '@/lib/auth';
import {
  JobQuerySchema,
  JobQuerySchemaType,
} from '@/lib/validators/jobs.validator';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';

const ManageJob = async ({
  searchParams,
}: {
  searchParams: JobQuerySchemaType;
}) => {
  const parsedData = JobQuerySchema.safeParse(searchParams);
  const server = await getServerSession(options);
  if (!server?.user) {
    redirect('/api/auth/signin');
  } else if (server.user.role !== 'ADMIN') {
    redirect('/jobs');
  }
  if (!(parsedData.success && parsedData.data)) {
    console.error(parsedData.error);
    redirect('/jobs');
  }
  const searchParamss = parsedData.data;
  return (
    <div className="container">
      <JobManagement searchParams={searchParamss} />
    </div>
  );
};

export default ManageJob;
