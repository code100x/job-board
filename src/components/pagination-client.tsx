'use client';
import { jobFilterQuery } from '@/actions/job.action';
import { PaginationNext, PaginationPrevious } from './ui/pagination';
import { JobQuerySchemaType } from '@/lib/validators/jobs.validator';

const PAGE_INCREMENT = 1;
const PaginationPreviousButton = ({
  searchParams,
  currentPage,
}: {
  searchParams: JobQuerySchemaType;
  currentPage: number;
}) => {
  return (
    <PaginationPrevious
      onClick={() =>
        jobFilterQuery({
          ...searchParams,
          page: currentPage - PAGE_INCREMENT,
        })
      }
      aria-disabled={currentPage - PAGE_INCREMENT < PAGE_INCREMENT}
      role="button"
      className="aria-disabled:pointer-events-none"
    />
  );
};
const PaginationNextButton = ({
  searchParams,
  currentPage,
  totalPages,
}: {
  searchParams: JobQuerySchemaType;
  currentPage: number;
  totalPages: number;
}) => {
  return (
    <PaginationNext
      role="button"
      onClick={() =>
        jobFilterQuery({
          ...searchParams,
          page: currentPage + PAGE_INCREMENT,
        })
      }
      aria-disabled={currentPage > totalPages - PAGE_INCREMENT}
      className="aria-disabled:pointer-events-none"
    />
  );
};
export { PaginationPreviousButton, PaginationNextButton };
