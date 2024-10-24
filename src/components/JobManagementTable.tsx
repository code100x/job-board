'use client';
import { useState, useEffect } from 'react';
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
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('latest');
  const [filteredJobs, setFilteredJobs] = useState(jobs.additional.jobs || []);

  useEffect(() => {
    let filtered = jobs.additional?.jobs || [];

    // Filter by search term (company or title)
    if (searchTerm) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.companyName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter) {
      filtered = filtered.filter((job) => {
        if (statusFilter === 'active') return !job.expired && !job.deleted;
        if (statusFilter === 'closed') return job.expired;
        if (statusFilter === 'deleted') return job.deleted;
        return true;
      });
    }

    // Sort jobs: Sort by title alphabetically

    // Additional sort options if needed
    if (sortOrder === 'latest') {
      filtered.sort(
        (a, b) =>
          new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
      );
    } else if (sortOrder === 'oldest') {
      filtered.sort(
        (a, b) =>
          new Date(a.postedAt).getTime() - new Date(b.postedAt).getTime()
      );
    }

    // filtered.sort((a, b) => a.title.localeCompare(b.title));
    setFilteredJobs(filtered);
  }, [searchTerm, statusFilter, sortOrder, jobs]);

  const totalPages =
    Math.ceil((jobs.additional?.totalJobs || 0) / JOBS_PER_PAGE) ||
    DEFAULT_PAGE;
  const currentPage = searchParams.page || DEFAULT_PAGE;

  return (
    <>
      <div className="min-h-screen w-4/5 mx-auto text-gray-100 p-8">
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold mb-6">Manage Jobs</h1>
          <Link href={'/create'}>
            <Button className="display-inline-flex">
              <Plus className="mr-2" /> Create Job
            </Button>
          </Link>
        </div>
        <div className="flex justify-between mb-6">
          {/* Search Input */}

          <div className="relative w-1/3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              className="pl-10 border-gray-800 text-gray-100 placeholder-gray-400"
              placeholder="Search jobs by company or title...."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filters */}
          <div className="flex gap-4">
            {/* Status Filter */}
            <Select onValueChange={(value) => setStatusFilter(value)}>
              <SelectTrigger className="w-[180px] border-gray-800 text-gray-100">
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
            <Select onValueChange={(value) => setSortOrder(value)}>
              <SelectTrigger className="w-[180px] bg-gray-900 border-gray-800 text-gray-100">
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
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-900 border-b border-gray-800">
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
              {filteredJobs.length ? (
                filteredJobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell className="px-2 py-2">{job.title}</TableCell>
                    <TableCell className="px-2 py-2">
                      {job.companyName}
                    </TableCell>
                    <TableCell className="px-2 py-2">{job.category}</TableCell>
                    <TableCell className="px-2 py-2">{job.type}</TableCell>
                    <TableCell className="px-2 py-2">
                      {new Date(job.postedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="px-2 py-2">
                      <span
                        className={`px-2 py-2 rounded-full text-xs ${
                          job.deleted
                            ? 'bg-red-500 bg-opacity-40 text-red-200'
                            : !job.expired
                              ? 'bg-green-900 bg-opacity-30 text-green-300'
                              : 'bg-yellow-900 bg-opacity-30 text-yellow-300'
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
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-4">
                    No jobs found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className=" mt-6">
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
    </>
  );
};

export default JobManagementTable;
