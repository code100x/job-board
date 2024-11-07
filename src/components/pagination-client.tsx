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
        currentPage - PAGE_INCREMENT >= PAGE_INCREMENT &&
        setQueryParams({
          page: (currentPage - PAGE_INCREMENT).toString(),
        })
      }
      className=" border dark:bg-slate-400 dark:bg-opacity-5 dark:text-white text-black bg-slate-600 bg-opacity-15   "
      //aria-disabled={currentPage - PAGE_INCREMENT < PAGE_INCREMENT}
      role="button"
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
        currentPage > totalPages - PAGE_INCREMENT &&
        setQueryParams({
          page: (currentPage + PAGE_INCREMENT).toString(),
        })
      }
      className=" border dark:bg-slate-400 dark:bg-opacity-5 dark:text-white text-black bg-slate-600 bg-opacity-15"
      //aria-disabled={currentPage > totalPages - PAGE_INCREMENT}
    />
  );
};
export { PaginationPreviousButton, PaginationNextButton };
