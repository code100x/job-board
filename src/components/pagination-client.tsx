"use client";
import { jobFilterQuery } from "@/actions/job.action";
import { PaginationNext, PaginationPrevious } from "./ui/pagination";
import { JobQuerySchemaType } from "@/lib/validators/jobs.validator";

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
          page: String(currentPage - 1),
        })
      }
      aria-disabled={currentPage - 1 < 1}
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
          page: String(currentPage + 1),
        })
      }
      aria-disabled={currentPage > totalPages - 1}
      className="aria-disabled:pointer-events-none"
    />
  );
};
export { PaginationPreviousButton, PaginationNextButton };
