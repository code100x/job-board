'use client';
import React from 'react';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';
import { toggleDeleteJobById } from '@/actions/job.action';
import { JobType } from '@/types/jobs.types';

const ToggleDelete = ({ job }: { job: JobType }) => {
  const { toast } = useToast();
  const handelToggle = async () => {
    try {
      const result = await toggleDeleteJobById({ id: job.id });
      if (result.status) {
        toast({ title: result.message, variant: 'default' });
      } else {
        toast({ title: result.message, variant: 'default' });
      }
    } catch (error) {
      console.error(error);
      toast({ title: 'An Error occurred', variant: 'destructive' });
    }
  };
  return (
    <>
      <Button
        className="mt-2"
        variant={'destructive'}
        onClick={handelToggle}
        aria-label="delete"
      >
        Delete
      </Button>
    </>
  );
};

export default ToggleDelete;
