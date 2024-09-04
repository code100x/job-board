'use client';
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { DeleteIcon, Edit } from 'lucide-react';
import { deleteJobById } from '@/actions/job.action';
import { getAllJobsAdditonalType } from '@/types/jobs.types';
import { ServerActionReturnType } from '@/types/api.types';
import { useToast } from './ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from './ui/button';

const JobManagementTable = ({
  jobs,
}: {
  jobs: ServerActionReturnType<getAllJobsAdditonalType>; //</getAllJobsAdditonalType i think we can give better type here todo:>
}) => {
  const { toast } = useToast();
  const handleDelete = async (jobId: string) => {
    const res = await deleteJobById({ id: jobId });
    const msg = await res.message;
    toast({
      title: msg,
    });
  };
  if (!jobs.status) {
    return <div>Error {jobs.message}</div>;
  }
  return (
    <>
      <Table className="mt-7">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Job Title</TableHead>
            <TableHead className="w-[200px]">JobType</TableHead>
            <TableHead className="w-[200px]">Location</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs.additional?.jobs.map((job) => (
            <TableRow key={job?.id}>
              <TableCell className="font-medium">{job?.title}</TableCell>
              <TableCell>{job?.workMode}</TableCell>
              <TableCell>{job?.location}</TableCell>
              <TableCell className="text-right w-full flex justify-end">
                <span className="mr-5" role="button">
                  <Edit />
                </span>
                <span role="button">
                  <Dialog>
                    <DialogTrigger>
                      <DeleteIcon />
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. This will Delete the
                          Selected JOB.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button
                          className="mt-2"
                          variant={'destructive'}
                          onClick={() => handleDelete(job.id)}
                        >
                          Delete
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default JobManagementTable;
