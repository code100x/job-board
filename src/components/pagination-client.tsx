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

  const isPreviousDisabled = currentPage <= PAGE_INCREMENT;

  return (
    <PaginationPrevious
      onClick={() => {
        if (!isPreviousDisabled) {
          setQueryParams({
            page: (currentPage - PAGE_INCREMENT).toString(),
          });
        }
      }}
      aria-disabled={isPreviousDisabled}
      role="button"
      className={`dark:bg-neutral-900 rounded-full bg-neutral-100 ${
        isPreviousDisabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
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
  const isNextDisabled = currentPage >= totalPages;
  return (
    <PaginationNext
      role="button"
      onClick={() => {
        if (!isNextDisabled) {
          setQueryParams({
            page: (currentPage + PAGE_INCREMENT).toString(),
          });
        }
      }}
      aria-disabled={isNextDisabled}
      className={`dark:bg-neutral-900 rounded-full bg-neutral-100 ${
        isNextDisabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    />
  );
};
export { PaginationPreviousButton, PaginationNextButton };
