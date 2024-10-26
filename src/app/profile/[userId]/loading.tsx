import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const Loading = () => {
  return (
    <>
      <div className="border rounded-2xl  h-72 overflow-hidden">
        <div className="w-full h-32 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
        <div className="p-6 relative flex-col flex gap-y-3">
          <Skeleton className="h-32 w-32 rounded-full absolute -top-16" />

          <div className="flex flex-col mt-12 gap-2">
            <Skeleton className="h-10 w-52 rounded-[8px]" />
            <Skeleton className="h-5 w-20 rounded-[8px]" />
          </div>
        </div>
      </div>
      {Array.from({ length: 12 }).map((value, index) => {
        if (index % 2 === 0) {
          return <Skeleton key={index} className="h-10 w-52 rounded-[8px]" />;
        } else {
          return <Skeleton key={index} className="h-40 w-full rounded-[8px]" />;
        }
      })}
    </>
  );
};

export default Loading;
