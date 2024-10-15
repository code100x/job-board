import PostJobForm from '@/components/job-form';
import React from 'react';
import { cn } from '@/lib/utils';
const page = () => {
  return (
    <div className="mt-10 flex flex-col items-center">
      <div>
        <h1 className="text-center text-4xl font-semibold">Post a job</h1>
        <p
          className={cn(
            'text-center mt-6 text-lg text-slate-500 dark:text-gray-300'
          )}
        >
          100xJobs is trusted by leading companies
        </p>
      </div>

      <PostJobForm />
    </div>
  );
};

export default page;
