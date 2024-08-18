'use client';
import { JobQuerySchemaType } from '@/lib/validators/jobs.validator';
import {
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from './pagination';
import useSetQueryParams from '@/hooks/useSetQueryParams';

export const PaginationPages = ({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
  searchParams: JobQuerySchemaType;
}) => {
  const setQueryParams = useSetQueryParams();
  function paginationHandler(page: number) {
    setQueryParams({ page: page.toString() });
  }
  const pages: JSX.Element[] = [];
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => paginationHandler(i)}
            isActive={i === currentPage}
            role="button"
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
  } else {
    for (let i = 1; i <= 2; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => paginationHandler(i)}
            isActive={i === currentPage}
            role="button"
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    if (2 < currentPage && currentPage < totalPages - 1) {
      pages.push(<PaginationEllipsis />);
      pages.push(
        <PaginationItem key={currentPage}>
          <PaginationLink isActive={true}>{currentPage}</PaginationLink>
        </PaginationItem>
      );
    }
    pages.push(<PaginationEllipsis />);
    for (let i = totalPages - 1; i <= totalPages; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            role="button"
            onClick={() => paginationHandler(i)}
            isActive={i === currentPage}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
  }
  return pages;
};
