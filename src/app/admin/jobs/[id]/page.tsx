import React from 'react';
import prisma from '@/config/prisma.config';

import { notFound } from 'next/navigation';
import PostJobForm from '@/components/job-form';

const UpdateJoPage = async ({ params }: { params: { id: string } }) => {
  let job;

  try {
    job = await prisma?.job.findUnique({ where: { id: params.id } });

    if (!job) notFound();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    notFound();
  }

  return (
    <div>
      <PostJobForm job={job} />
    </div>
  );
};

export default UpdateJoPage;
