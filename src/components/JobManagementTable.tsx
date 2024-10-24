import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Plus, Search } from 'lucide-react';

import { getAllJobsAdditonalType } from '@/types/jobs.types';
import { ServerActionReturnType } from '@/types/api.types';

import { JobQuerySchemaType } from '@/lib/validators/jobs.validator';
import { DEFAULT_PAGE, JOBS_PER_PAGE } from '@/config/app.config';
import { Pagination, PaginationContent, PaginationItem } from './ui/pagination';
import {
  PaginationNextButton,
  PaginationPreviousButton,
} from './pagination-client';
import APP_PATHS from '@/config/path.config';
import { PaginationPages } from './ui/paginator';
import DeleteDialog from './DeleteDialog';
import ToggleApproveJobButton from './ToggleApproveJobButton';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Button } from './ui/button';
import Link from 'next/link';

type props = {
  searchParams: JobQuerySchemaType;
  jobs: ServerActionReturnType<getAllJobsAdditonalType>;
};

const JobManagementTable = ({ jobs, searchParams }: props) => {
  // const [searchTerm, setSearchTerm] = useState('');
  // const [statusFilter, setStatusFilter] = useState('');
  // const [sortOrder, setSortOrder] = useState('latest');

  if (!jobs.status) {
    return <div>Error {jobs.message}</div>;
  }

  const totalPages =
    Math.ceil((jobs.additional?.totalJobs || 0) / JOBS_PER_PAGE) ||
    DEFAULT_PAGE;
  const currentPage = searchParams.page || DEFAULT_PAGE;

  return (
    <>
      <div className="min-h-screen w-4/5 mx-auto p-8  text-gray-900 dark:text-gray-100">
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold mb-6">Manage Jobs</h1>
          <Link href={'/create'}>
            <Button className="display-inline-flex">
              <Plus className="mr-2" /> Post New Job
            </Button>
          </Link>
        </div>
        <div className="flex justify-between mb-6">
          {/* Search Input */}
          <div className="relative w-1/3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-400" />
            <Input
              className="pl-10 border-gray-800 dark:border-gray-600 text-gray-900 dark:bg-gray-800 dark:text-gray-100 placeholder-gray-400"
              placeholder="Search jobs by company or title...."
            />
          </div>

          {/* Filters */}
          <div className="flex gap-4">
            {/* Status Filter */}
            <Select>
              <SelectTrigger className=" border-gray-800 dark:border-gray-600 text-gray-900 dark:bg-gray-800 dark:text-gray-100">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
                <SelectItem value="deleted">Deleted</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort Order */}
            <Select>
              <SelectTrigger className="  dark:bg-gray-800 dark:text-gray-100 border-gray-800 dark:border-gray-600 text-gray-900 ">
                <SelectValue placeholder="Latest Jobs" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">Latest Jobs</SelectItem>
                <SelectItem value="oldest">Oldest Jobs</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Jobs Table */}
        <div className="rounded-md border overflow-hidden dark:border-gray-600">
          <Table>
            <TableHeader className="bg-gray-100  dark:bg-gray-800 border-b border-gray-800 dark:border-gray-600">
              <TableRow>
                <TableHead>Job Title</TableHead>
                <TableHead>Company Name</TableHead>
                <TableHead>Job Category</TableHead>
                <TableHead>Job Type</TableHead>
                <TableHead>Posted Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Verified</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobs.additional?.jobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell className="px-2 py-2">{job.title}</TableCell>
                  <TableCell className="px-2 py-2">{job.companyName}</TableCell>
                  <TableCell className="px-2 py-2">{job.category}</TableCell>
                  <TableCell className="px-2 py-2">{job.type}</TableCell>
                  <TableCell className="px-2 py-2">
                    {new Date(job.postedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="px-2 py-2">
                    <span
                      className={`px-2 py-2 rounded-full text-xs font-bold 
                                                  ${
                                                    job.deleted
                                                      ? 'bg-red-300 dark:bg-red-600 dark:bg-opacity-30 bg-opacity-30 text-red-700 dark:text-red-200'
                                                      : job.expired
                                                        ? 'bg-yellow-100 dark:bg-yellow-600 bg-opacity-50 dark:bg-opacity-30 text-yellow-700 dark:text-yellow-200'
                                                        : 'bg-green-100 dark:bg-green-600 bg-opacity-50 dark:bg-opacity-30 text-green-700 dark:text-green-200'
                                                  }`}
                    >
                      {job.deleted
                        ? 'Deleted'
                        : job.expired
                          ? 'Closed'
                          : 'Active'}
                    </span>
                  </TableCell>
                  <TableCell className="px-2 py-2">
                    <ToggleApproveJobButton job={job} />
                  </TableCell>
                  <TableCell className="px-2 py-2">
                    <DeleteDialog job={job} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className=" mt-6">
          <div className="mt-6 flex justify-start">
            <div className="ml-8">
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
          </div>
        </div>
      </div>
    </>
  );
};

export default JobManagementTable;
