import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from './ui/sheet';
import JobFilters from '@/layouts/job-filters';
import { JobQuerySchemaType } from '@/lib/validators/jobs.validator';

export function FilterSheet({
  children,
  searchParams,
}: {
  children: React.ReactNode;
  searchParams: JobQuerySchemaType;
}) {
  return (
    <Sheet>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent side={'left'} className="h-full w-80">
        <SheetHeader className="mt-2 h-full w-full">
          <JobFilters searchParams={searchParams}></JobFilters>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
