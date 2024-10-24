'use client';
import React, { useState } from 'react';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';
import { toggleDeleteJobById } from '@/actions/job.action';
import { JobType } from '@/types/jobs.types';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from './ui/dialog';
import { ArchiveRestore, Trash2 } from 'lucide-react';

const JobDialog = ({ job }: { job: JobType }) => {
  const [dialogOpen, setDialogOpen] = useState(false); // State to manage dialog visibility
  const { toast } = useToast();

  const handelToggle = async () => {
    try {
      const result = await toggleDeleteJobById({ id: job.id });
      toast({
        title: result.message,
        variant: 'default',
      });
      setDialogOpen(false);
    } catch (error) {
      console.error(error);
      toast({ title: 'An Error occurred', variant: 'destructive' });
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger>
        {job.deleted ? (
          <span
            className="mr-5"
            role="button"
            onClick={() => setDialogOpen(true)}
          >
            <Button variant="ghost" size="icon">
              <ArchiveRestore className="h-7 w-5 text-green-500" />
            </Button>
          </span>
        ) : (
          <span
            className="mr-5"
            role="button"
            onClick={() => setDialogOpen(true)}
          >
            <Button variant="ghost" size="icon">
              <Trash2 className="h-7 w-5 text-red-500" />
            </Button>
          </span>
        )}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {job.deleted
              ? 'Are you sure you want to Restore?'
              : 'Are you absolutely sure?'}
          </DialogTitle>
          <DialogDescription>
            {job.deleted
              ? 'This action will restore the deleted job.'
              : 'This action cannot be undone. This will delete the selected job.'}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            className="mt-2"
            variant={job.deleted ? 'secondary' : 'destructive'}
            onClick={handelToggle}
          >
            {job.deleted ? 'Restore' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default JobDialog;
