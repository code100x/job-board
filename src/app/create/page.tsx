import PostJobForm from '@/components/job-form';
import React from 'react';

const page = () => {
  return (
    <div className="mt-10">
      <div>
        <h1 className="text-center text-4xl font-semibold">Post a job</h1>
        <p className="text-center mt-6 text-lg text-gray-300">
          100xJobs is trusted by leading companies
        </p>
      </div>
      <PostJobForm />
    </div>
  );
};

export default page;
