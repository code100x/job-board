'use client';
import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { DeleteIcon, Edit } from 'lucide-react';
import { getAllJobsAdditonalType, JobType } from '@/types/jobs.types';
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
import { JobQuerySchemaType } from '@/lib/validators/jobs.validator';
import { DEFAULT_PAGE, JOBS_PER_PAGE } from '@/config/app.config';
import { Pagination, PaginationContent, PaginationItem } from './ui/pagination';
import {
  PaginationNextButton,
  PaginationPreviousButton,
} from './pagination-client';
import APP_PATHS from '@/config/path.config';
import { PaginationPages } from './ui/paginator';
import { deleteJobById, getAllJobs } from '@/actions/job.action';

type props = {
  searchParams: JobQuerySchemaType;
  jobs: ServerActionReturnType<getAllJobsAdditonalType>;
  initialJobs: JobType[];
};

const JobManagementTable = ({ jobs, searchParams, initialJobs }: props) => {
  const { toast } = useToast();
  const [DispJobs, setDispJobs] = useState<JobType[]>(initialJobs);

  const handleDelete = async (JobId: string) => {
    try {
      const result = await deleteJobById({ id: JobId });
      if (result.status) {
        setDispJobs((prevJobs) => prevJobs.filter((job) => job.id !== JobId));
        toast({ title: result.message });
      }
    } catch (error: any) {
      toast({
        title: 'Failed to delete job',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const refreshJobs = async () => {
    const refreshedJobs = await getAllJobs(searchParams);
    if (refreshedJobs.status && Array.isArray(refreshedJobs.additional?.jobs)) {
      setDispJobs(refreshedJobs.additional?.jobs);
    }
  };

  useEffect(() => {
    refreshJobs();
  }, [searchParams]);

  if (!jobs.status) {
    return <div>Error {jobs.message}</div>;
  }

  const totalPages =
    Math.ceil((jobs.additional?.totalJobs || 0) / JOBS_PER_PAGE) ||
    DEFAULT_PAGE;
  const currentPage = parseInt(searchParams.page?.toString()) || DEFAULT_PAGE;
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-12">
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
            {DispJobs?.map((job) => (
              <TableRow key={job?.id}>
                <TableCell className="font-medium">{job?.title}</TableCell>
                <TableCell>{job?.workMode}</TableCell>
                <TableCell>{job?.city}</TableCell>
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
        <Pagination>
          <PaginationContent>
            {totalPages ? (
              <PaginationItem>
                <PaginationPreviousButton
                  searchParams={searchParams}
                  currentPage={currentPage}
                  baseUrl={APP_PATHS.JOBS}
                />
              </PaginationItem>
            ) : null}
            <PaginationPages
              searchParams={searchParams}
              currentPage={currentPage}
              totalPages={totalPages}
              baseUrl={APP_PATHS.JOBS}
            />
            {totalPages ? (
              <PaginationItem>
                <PaginationNextButton
                  searchParams={searchParams}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  baseUrl={APP_PATHS.JOBS}
                />
              </PaginationItem>
            ) : null}
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
};

export default JobManagementTable;
