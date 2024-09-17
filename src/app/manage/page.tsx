import JobManagement from '@/components/JobManagement';
import {
  JobQuerySchema,
  JobQuerySchemaType,
} from '@/lib/validators/jobs.validator';
import { redirect } from 'next/navigation';
import React from 'react';

const ManageJob = ({ searchParams }: { searchParams: JobQuerySchemaType }) => {
  const parsedData = JobQuerySchema.safeParse(searchParams);
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
