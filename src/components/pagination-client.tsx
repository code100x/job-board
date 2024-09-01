'use client';
import { PaginationNext, PaginationPrevious } from './ui/pagination';
import { JobQuerySchemaType } from '@/lib/validators/jobs.validator';
import useSetQueryParams from '@/hooks/useSetQueryParams';

const PAGE_INCREMENT = 1;
const PaginationPreviousButton = ({
  currentPage,
}: {
  searchParams: JobQuerySchemaType;
  currentPage: number;
  baseUrl: string;
}) => {
  const setQueryParams = useSetQueryParams();
  return (
    <PaginationPrevious
      onClick={() =>
        setQueryParams({
          page: (currentPage - PAGE_INCREMENT).toString(),
        })
      }
      aria-disabled={currentPage - PAGE_INCREMENT < PAGE_INCREMENT}
      role="button"
      className="aria-disabled:pointer-events-none dark:bg-neutral-900 rounded-full bg-neutral-100"
    />
  );
};
const PaginationNextButton = ({
  currentPage,
  totalPages,
}: {
  searchParams: JobQuerySchemaType;
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}) => {
  const setQueryParams = useSetQueryParams();
  return (
    <PaginationNext
      role="button"
      onClick={() =>
        setQueryParams({
          page: (currentPage + PAGE_INCREMENT).toString(),
        })
      }
      aria-disabled={currentPage > totalPages - PAGE_INCREMENT}
      className="aria-disabled:pointer-events-none dark:bg-neutral-900 rounded-full bg-neutral-100"
    />
  );
};
export { PaginationPreviousButton, PaginationNextButton };
