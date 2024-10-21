'use client';
import React from 'react';
import { Button } from './ui/button';
import { deleteJobById } from '@/actions/job.action';
import { useToast } from './ui/use-toast';

const RemoveJobButton = ({ jobId }: { jobId: string }) => {
  const { toast } = useToast();
  const handleDelete = async () => {
    try {
      const result = await deleteJobById({ id: jobId });
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
      <Button className="mt-2" variant={'destructive'} onClick={handleDelete}>
        Delete
      </Button>
    </>
  );
};

export default RemoveJobButton;
