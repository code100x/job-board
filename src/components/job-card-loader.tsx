import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const JobCardLoader = () => {
  return (
    <div>
      <div className=" dark:bg-neutral-900  mt-3 bg-background w-full flex flex-col md:flex-row md:items-center items-start gap-4 rounded-3xl border p-5 px-6 text-left text-sm transition-all hover:bg-accent">
        <div>
          <Skeleton className="h-[100px] w-[100px] rounded-xl flex justify-center items-center" />
        </div>
        <div className="flex w-full flex-col gap-2 ">
          <p className="font-semibold text-xl sm:text-2xl">
            <Skeleton className="h-4 w-[350px]" />
          </p>
          <p className="font-semibold text-xl sm:text-2xl">
            <Skeleton className="h-4 w-[100px]" />
          </p>
        </div>
      </div>
      <div className=" dark:bg-neutral-900  mt-3 bg-background w-full flex flex-col md:flex-row md:items-center items-start gap-4 rounded-3xl border p-5 px-6 text-left text-sm transition-all hover:bg-accent">
        <div>
          <Skeleton className="h-[100px] w-[100px] rounded-xl flex justify-center items-center" />
        </div>
        <div className="flex w-full flex-col gap-2 ">
          <p className="font-semibold text-xl sm:text-2xl">
            <Skeleton className="h-4 w-[350px]" />
          </p>
          <p className="font-semibold text-xl sm:text-2xl">
            <Skeleton className="h-4 w-[100px]" />
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobCardLoader;
