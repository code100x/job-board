'use client';
import React, { useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';
import { toggleApproveJob } from '@/actions/job.action';
import { JobType } from '@/types/jobs.types';
import { Badge } from './ui/badge';

const ToggleApproveJobButton = ({ job }: { job: JobType }) => {
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);

  const isApproved = job.isVerifiedJob;

  const handleToggleJob = async () => {
    try {
      const result = await toggleApproveJob({ id: job.id });
      if (result.status) {
        toast({ title: result.message, variant: 'success' });
      } else {
        toast({ variant: 'destructive', title: result.message });
      }
    } catch (error) {
      console.error(error);
      toast({ title: 'An error occurred' });
    } finally {
      setDialogOpen(false);
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger>
        <Badge
          className={`cursor-pointer tracking-wide ${
            !isApproved ? 'bg-zinc-700 text-white' : 'bg-green-500 text-white'
          }`}
        >
          {isApproved ? 'Approved' : 'Unapproved'}
        </Badge>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isApproved ? 'Unapprove this Job?' : 'Approve this Job?'}
          </DialogTitle>
          <DialogDescription>
            {isApproved
              ? 'Unapproving this job will make it invisible to users.'
              : 'Approving this job will make it visible to users.'}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button
              className="mt-2"
              variant={'secondary'}
              onClick={handleToggleJob}
            >
              {isApproved ? 'Unapprove' : 'Approve'}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ToggleApproveJobButton;
