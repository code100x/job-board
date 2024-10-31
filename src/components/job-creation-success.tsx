import React from 'react';
import { Button } from './ui/button';

const JobCreateSuccess = ({ isVerifiedJob }: { isVerifiedJob: boolean }) => {
  const message = isVerifiedJob
    ? 'Thank you for posting a job with us.'
    : ' Your job will be visible to the public after admin approval.';
  return (
    <div>
      <h1>Job created successfully!</h1>
      <p>{message}</p>
      <Button aria-label="post-another-job">Post another job</Button>
    </div>
  );
};

export default JobCreateSuccess;
