import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getUserCreatedJob } from '@/actions/job.action';
import { getServerSession } from 'next-auth';
import { options } from '@/lib/auth';
import JobManagementHeader from './JobManagementHeader';
import { DeleteIcon, Edit } from 'lucide-react';

const JobManagement = async () => {
  const session = await getServerSession(options);
  if (!session || !session.user) {
    return 'UnAuthorized Access!';
  }
  const id = session?.user.id;
  const jobs = await getUserCreatedJob({ id: id });
  if (!jobs.status) {
    return <div>Error {jobs.message}</div>;
  }
  return (
    <div className="pt-2 px-6 mt-10">
      <JobManagementHeader />
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
            <TableRow key={job.id}>
              <TableCell className="font-medium">{job.title}</TableCell>
              <TableCell>{job.workMode}</TableCell>
              <TableCell>{job.location}</TableCell>
              <TableCell className="text-right w-full flex justify-end">
                <span className="mr-5" role="button">
                  <Edit />
                </span>
                <span className="" role="button">
                  <DeleteIcon />
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
export default JobManagement;
