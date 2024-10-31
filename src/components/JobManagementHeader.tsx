import React from 'react';
import Link from 'next/link';
import { Button } from './ui/button';

const JobManagementHeader = () => {
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
          <Button aria-label="post-new-job">
            <Link href={'/create'}>Post new Job</Link>
          </Button>
        </div>
      </header>
    </>
  );
};

export default JobManagementHeader;
