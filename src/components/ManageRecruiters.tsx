import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Search, Trash2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Input } from './ui/input';
import { RecruitersTypes } from '@/types/recruiters.types';
import { Button } from './ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './ui/pagination';

const ManageRecruiters = ({
  recruiters,
}: {
  recruiters: RecruitersTypes[];
}) => {
  return (
    <div className="min-h-screen w-full max-w-6xl mx-auto p-6 md:p-8 text-gray-900 dark:text-gray-100">
      <div className="flex flex-col md:flex-row justify-between mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Manage Recruiters</h1>
      </div>

      <div className="flex flex-col md:flex-row justify-between mb-6">
        <div className="relative w-full md:w-1/3 flex items-center mb-4 md:mb-0">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-400" />
          <Input
            className="pl-10 border-gray-300 text-gray-900 placeholder-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-white"
            placeholder="Search recruiters...."
          />
        </div>
        <div className="flex gap-4 items-center">
          <Select>
            <SelectTrigger className="w-[180px] border-gray-300 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
              <SelectItem value="deleted">Deleted</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px] border-gray-300 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100">
              <SelectValue placeholder="Sort Order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">Latest Recruiter</SelectItem>
              <SelectItem value="oldest">Oldest Recruiter</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border overflow-hidden dark:border-gray-700">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-200 border-b border-gray-300 dark:bg-gray-800 dark:border-gray-700">
              <TableRow>
                <TableHead className="px-2 py-4">Company Name</TableHead>
                <TableHead className="px-2 py-4">Company Email</TableHead>
                <TableHead className="px-2 py-4">Jobs Posted</TableHead>
                <TableHead className="px-2 py-4">Created At</TableHead>
                <TableHead className="px-2 py-4">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recruiters.length ? (
                recruiters.map((recruiter) => (
                  <TableRow key={recruiter.id}>
                    <TableCell className="px-2 py-2">
                      {recruiter.companyName}
                    </TableCell>
                    <TableCell className="px-2 py-2">
                      {recruiter.companyEmail}
                    </TableCell>
                    <TableCell className="px-2 py-2">
                      {recruiter.jobsPosted}
                    </TableCell>
                    <TableCell className="px-2 py-2">
                      {recruiter.createdAt}
                    </TableCell>
                    <TableCell className="px-2 py-2">
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-7 w-5 text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">
                    No Recruiters
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="mt-6 flex justify-start">
        <div className="">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  className="border hover:border-blue-600 dark:bg-slate-400 dark:bg-opacity-5 dark:text-white text-black bg-slate-600 bg-opacity-15"
                  href="#"
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  className="border hover:border-blue-600 dark:bg-slate-400 dark:bg-opacity-5 dark:text-white text-black bg-slate-600 bg-opacity-15"
                  href="#"
                >
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  className="border hover:border-blue-600 dark:bg-slate-400 dark:bg-opacity-5 dark:text-white text-black bg-slate-600 bg-opacity-15"
                  href="#"
                  isActive
                >
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  className="border hover:border-blue-600 dark:bg-slate-400 dark:bg-opacity-5 dark:text-white text-black bg-slate-600 bg-opacity-15"
                  href="#"
                >
                  3
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  className="border hover:border-blue-600 dark:bg-slate-400 dark:bg-opacity-5 dark:text-white text-black bg-slate-600 bg-opacity-15"
                  href="#"
                >
                  <PaginationEllipsis />
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  className="border hover:border-blue-600 dark:bg-slate-400 dark:bg-opacity-5 dark:text-white text-black bg-slate-600 bg-opacity-15"
                  href="#"
                >
                  9
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  className="border hover:border-blue-600 dark:bg-slate-400 dark:bg-opacity-5 dark:text-white text-black bg-slate-600 bg-opacity-15"
                  href="#"
                >
                  10
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  className="border hover:border-blue-600 dark:bg-slate-400 dark:bg-opacity-5 dark:text-white text-black bg-slate-600 bg-opacity-15"
                  href="#"
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default ManageRecruiters;
