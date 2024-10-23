'use client';
import { approveJob } from '@/actions/job.action';
import React from 'react';
import ApproveJobDialog from './ApproveJobDialog';
import { useToast } from './ui/use-toast';
import { sendNotificationAction } from '@/actions/notification';

const ApproveJobButton = ({ jobId }: { jobId: string }) => {
  const { toast } = useToast();
  const handleApproveJob = async (jobId: string) => {
    try {
      const result = await approveJob({ id: jobId });
      if (result.status) {
        toast({ title: result.message, variant: 'success' });

        await sendNotificationAction(
          'New Posting Alert',
          'New Job is recently posted by 100xdevs , come fast and apply before other applys.',
          `/jobs/${jobId}`,
          '/main.png'
        );
      } else {
        toast({ variant: 'destructive', title: result.message });
      }
    } catch (error) {
      console.error(error);
      toast({ title: 'An error occured' });
    }
  };
  return (
    <div>
      <ApproveJobDialog
        title="Approve this Job?"
        description='"Approving this job will make it visible to users"'
        handleClick={() => {
          handleApproveJob(jobId);
        }}
      />
    </div>
  );
};

export default ApproveJobButton;
