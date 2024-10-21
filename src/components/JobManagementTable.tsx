import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Edit, X } from 'lucide-react';
import { getAllJobsAdditonalType } from '@/types/jobs.types';
import { ServerActionReturnType } from '@/types/api.types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { JobQuerySchemaType } from '@/lib/validators/jobs.validator';
import { DEFAULT_PAGE, JOBS_PER_PAGE } from '@/config/app.config';
import { Pagination, PaginationContent, PaginationItem } from './ui/pagination';
import {
  PaginationNextButton,
  PaginationPreviousButton,
} from './pagination-client';
import APP_PATHS from '@/config/path.config';
import { PaginationPages } from './ui/paginator';
import ApproveJobButton from './approveJobButton';
import RemoveJobButton from './removeJobButton';

type props = {
  searchParams: JobQuerySchemaType;
  jobs: ServerActionReturnType<getAllJobsAdditonalType>;
};

const JobManagementTable = ({ jobs, searchParams }: props) => {
  if (!jobs.status) {
    return <div>Error {jobs.message}</div>;
  }

  const totalPages =
    Math.ceil((jobs.additional?.totalJobs || 0) / JOBS_PER_PAGE) ||
    DEFAULT_PAGE;
  const currentPage = searchParams.page || DEFAULT_PAGE;
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-12">
        <Table className="mt-7">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Job Title</TableHead>
              <TableHead className="w-[150px]">JobType</TableHead>
              <TableHead className="w-[200px]">Location</TableHead>
              <TableHead className="w-[200px]">isVerified</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.additional?.jobs?.map((job) => (
              <TableRow key={job?.id}>
                <TableCell className="font-medium">{job?.title}</TableCell>
                <TableCell>{job?.workMode}</TableCell>
                <TableCell>{job?.city}</TableCell>
                <TableCell>
                  {job.isVerifiedJob ? (
                    job.deleted ? (
                      <span className="bg-red-400 p-1 rounded-md text-secondary px-3 tracking-wide">
                        Deleted
                      </span>
                    ) : (
                      <span className="bg-green-400 p-1 rounded-md text-secondary px-3 tracking-wide">
                        Approved
                      </span>
                    )
                  ) : (
                    <ApproveJobButton jobId={job.id} />
                  )}
                </TableCell>
                <TableCell className="text-right w-full flex justify-end">
                  <span className="mr-5" role="button">
                    <Edit />
                  </span>
                  <span role="button">
                    <Dialog>
                      <DialogTrigger>
                        <X />
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
                          <RemoveJobButton jobId={job.id} />
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
