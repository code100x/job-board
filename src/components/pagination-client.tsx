'use client';
import { jobFilterQuery } from '@/actions/job.action';
import { PaginationNext, PaginationPrevious } from './ui/pagination';
import { JobQuerySchemaType } from '@/lib/validators/jobs.validator';

const PAGE_INCREMENT = 1;
const PaginationPreviousButton = ({
  searchParams,
  currentPage,
  baseUrl,
}: {
  searchParams: JobQuerySchemaType;
  currentPage: number;
  baseUrl: string;
}) => {
  return (
    <PaginationPrevious
      onClick={() =>
        jobFilterQuery(
          {
            ...searchParams,
            page: currentPage - PAGE_INCREMENT,
          },
          baseUrl
        )
      }
      aria-disabled={currentPage - PAGE_INCREMENT < PAGE_INCREMENT}
      role="button"
      className="aria-disabled:pointer-events-none dark:bg-neutral-900 rounded-full bg-neutral-100"
    />
  );
};
const PaginationNextButton = ({
  searchParams,
  currentPage,
  totalPages,
  baseUrl,
}: {
  searchParams: JobQuerySchemaType;
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}) => {
  return (
    <PaginationNext
      role="button"
      onClick={() =>
        jobFilterQuery(
          {
            ...searchParams,
            page: currentPage + PAGE_INCREMENT,
          },
          baseUrl
        )
      }
      aria-disabled={currentPage > totalPages - PAGE_INCREMENT}
      className="aria-disabled:pointer-events-none dark:bg-neutral-900 rounded-full bg-neutral-100"
    />
  );
};
export { PaginationPreviousButton, PaginationNextButton };
