'use client';
import React from 'react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

const JobManagementHeader = () => {
  const router = useRouter();
  return (
    <>
      <header className="pt-4 px-6 flex justify-between items-center">
        <div>
          <p className="text-2xl font-semibold">Active Job Posting</p>
          <span className="text-slate-500">
            View and Manage all active job posting.
          </span>
        </div>
        <div>
          <Button
            onClick={() => {
              router.push('/create');
            }}
          >
            Post new Job
          </Button>
        </div>
      </header>
    </>
  );
};

export default JobManagementHeader;
