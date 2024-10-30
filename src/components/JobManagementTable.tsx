'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Plus, Search } from 'lucide-react';

import { JobType, getAllJobsAdditonalType } from '@/types/jobs.types';

import { JobQuerySchemaType } from '@/lib/validators/jobs.validator';
import { DEFAULT_PAGE, JOBS_PER_PAGE } from '@/config/app.config';

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
import { useState, useEffect } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './ui/pagination';

type props = {
  searchParams: JobQuerySchemaType;
  jobs: getAllJobsAdditonalType | undefined;
};

const JobManagementTable = ({ jobs, searchParams }: props) => {
  const [filteredJobs, setFilteredJobs] = useState<JobType[]>([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [orderFilter, setOrderFilter] = useState('latest');
  const [currentPage, setCurrentPage] = useState(
    searchParams.page || DEFAULT_PAGE
  );
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (jobs?.jobs) {
      const filtered = jobs?.jobs.filter((job) => {
        if (statusFilter === 'All') return true;
        if (statusFilter === 'active')
          return !job.deleted && !job.expired && job.isVerifiedJob;
        if (statusFilter === 'deleted') return job.deleted;
        if (statusFilter === 'closed')
          return (job.expired || !job.isVerifiedJob) && !job.deleted;
        return true;
      });

      const searched = filtered.filter((job) => {
        const lowerCaseTitle = job.title.toLowerCase();
        const lowerCaseCompanyName = job.companyName.toLowerCase();
        return (
          lowerCaseTitle.includes(searchTerm.toLowerCase()) ||
          lowerCaseCompanyName.includes(searchTerm.toLowerCase())
        );
      });

      const sorted = searched.sort((a, b) => a.title.localeCompare(b.title));

      if (orderFilter === 'latest') {
        sorted.sort(
          (a, b) =>
            new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
        );
      } else {
        sorted.sort(
          (a, b) =>
            new Date(a.postedAt).getTime() - new Date(b.postedAt).getTime()
        );
      }

      setFilteredJobs(sorted);
    }
  }, [jobs?.jobs, statusFilter, orderFilter, searchTerm]);

  const totalPages =
    Math.ceil(filteredJobs.length / JOBS_PER_PAGE) || DEFAULT_PAGE;
  const startIndex = (currentPage - 1) * JOBS_PER_PAGE;
  const currentJobs = filteredJobs.slice(
    startIndex,
    startIndex + JOBS_PER_PAGE
  );

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(Math.min(Math.max(pageNumber, 1), totalPages));
  };

  return (
    <div className="min-h-screen sm:max-w-7xl max-w-96   mx-auto p-4 sm:p-8 text-gray-900 dark:text-gray-100">
      <div className="flex flex-col sm:flex-row justify-between mb-6">
        <h1 className="text-2xl font-bold mb-4 sm:mb-0">Manage Jobs</h1>
        <Link href={'/create'}>
          <Button className="flex items-center">
            <Plus className="mr-2" /> Post New Job
          </Button>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row justify-between mb-6">
        <div className="relative w-full sm:w-1/3 mb-4 sm:mb-0">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-400" />
          <Input
            className="pl-10 border-gray-800 dark:border-gray-600 text-gray-900 dark:bg-gray-800 dark:text-gray-100 placeholder-gray-400"
            placeholder="Search jobs by company or title...."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex  sm:flex-row gap-4">
          <Select onValueChange={setStatusFilter}>
            <SelectTrigger className="border-gray-800 dark:border-gray-600 text-gray-900 dark:bg-gray-800 dark:text-gray-100">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
              <SelectItem value="deleted">Deleted</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={setOrderFilter}>
            <SelectTrigger className="dark:bg-gray-800 dark:text-gray-100 border-gray-800 dark:border-gray-600 text-gray-900">
              <SelectValue placeholder="Latest Jobs" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">Latest Jobs</SelectItem>
              <SelectItem value="oldest">Oldest Jobs</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border  overflow-hidden dark:border-gray-600 w-full  sm:max-w-7xl  max-w-96">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-100 dark:bg-gray-800 border-b border-gray-800 dark:border-gray-600">
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
              {currentJobs.map((job) => (
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
                                  : job.expired || !job.isVerifiedJob
                                    ? 'bg-yellow-100 dark:bg-yellow-600 bg-opacity-50 dark:bg-opacity-30 text-yellow-700 dark:text-yellow-200'
                                    : 'bg-green-100 dark:bg-green-600 bg-opacity-50 dark:bg-opacity-30 text-green-700 dark:text-green-200'
                              }`}
                    >
                      {job.deleted
                        ? 'Deleted'
                        : job.expired || !job.isVerifiedJob
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
      </div>

      <div className="mt-6">
        <div className="flex justify-center sm:justify-start">
          <Pagination>
            <PaginationContent>
              <PaginationItem onClick={() => handlePageChange(currentPage - 1)}>
                <PaginationPrevious />
              </PaginationItem>
              {[...Array(totalPages)].map((_, index) => (
                <PaginationItem
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                >
                  <PaginationLink>{index + 1}</PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem onClick={() => handlePageChange(currentPage + 1)}>
                <PaginationNext />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default JobManagementTable;
