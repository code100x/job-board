'use client';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { API } from '@/lib/config';

import { DataTable } from '@/components/ui/data-table';
import { columns } from './column';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const List = () => {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, isError, isLoading } = useQuery({
    queryKey: ['jobs'],
    queryFn: () => axios.get(`${API}/admin/jobs`).then((res) => res.data),
    staleTime: 1000 * 60,
    retry: 3,
  });

  if (isLoading) return <h1>...loading Jops</h1>;

  // eslint-disable-next-line no-console
  console.log('Product data', data);

  return (
    <div className="my-4 space-y-4  sm:p-6  lg:p-2">
      <div className="flex justify-end">
        <Button
          className="mt-4"
          onClick={() => router.push('jobs/create')}
          variant={'outline'}
        >
          Create New Job
        </Button>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default List;
