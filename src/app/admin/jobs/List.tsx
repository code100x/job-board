'use client';
import React from 'react';
import { useQuery } from '@tanstack/react-query';

import { DataTable } from '@/components/ui/data-table';
import { columns } from './column';
import { Button } from '@/components/ui/button';
import { getJobListWithoutPagination } from '@/actions/job.action';
import Link from 'next/link';

const List = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['jobs'],
    queryFn: async () => {
      const response = await getJobListWithoutPagination();

      return response;
    },
  });
  if (!data) return;

  if (isLoading)
    return <div className="flex justify-center ">...loading Jops</div>;

  return (
    <div className="my-4 space-y-4  sm:p-6  lg:p-2">
      <div className="flex justify-end">
        <Link href={'jobs/create'}>
          <Button className="mt-4" variant={'outline'}>
            {' '}
            Create New Job
          </Button>
        </Link>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default List;
