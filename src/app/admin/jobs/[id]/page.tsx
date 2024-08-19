import React from 'react';

import PostJobForm from '@/components/job-form';
import { getJobById } from '@/actions/job.action';
import { JobByIdSchemaType } from '@/lib/validators/jobs.validator';
import { redirect } from 'next/navigation';

const UpdateJoPage = async ({ params }: { params: JobByIdSchemaType }) => {
  const job = await getJobById(params);

  if (!job.status) {
    return;
  }

  const jobDetail = job.additional?.job;
  if (!jobDetail) {
    return redirect('/jobs');
  }
  return (
    <div>
      <PostJobForm job={jobDetail} />
    </div>
  );
};

export default UpdateJoPage;
