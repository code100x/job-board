"use client";
import NewJobModal from "@/components/NewJobModal";
import { redirect } from "next/navigation";
import ManageJobsCard from "@/components/ManageJobsCard";
import { cn } from "@/lib/utils";
import { useSession } from "@/hooks/useSession";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Job } from "@prisma/client";
import { getAllJobsForAdmin } from "@/actions/job";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";

const ManageJobsPage = () => {
    const session = useSession();
    const user = session.session?.user;
    const [page, setPage] = useState(1);
    const [pageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const role = user?.role;
    const [fetchingJobs, setFetchingJobs] = useState<boolean>(true);
    const [jobs, setJobs] = useState<Job[]>([]);

    if (role && role !== "ADMIN") {
        redirect("/");
    }

    const fetchData = useCallback(async () => {
        setFetchingJobs(true);
        const res = await getAllJobsForAdmin({ page, pageSize });
        if (res.status === "success") {
            setJobs(res.data as Job[]);
            setTotalPages(res.totalPages as number);
        }
        setFetchingJobs(false);
    }, [page, pageSize]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const renderPagination = useMemo(() => {
        return (
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            className="cursor-pointer"
                            onClick={(e) => {
                                e.preventDefault();
                                if (page > 1) setPage(page - 1);
                            }}
                        />
                    </PaginationItem>
                    {[...Array(totalPages)].map((_, index) => (
                        <PaginationItem key={index}>
                            <PaginationLink
                                className="cursor-pointer"
                                isActive={page === index + 1}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setPage(index + 1);
                                }}
                            >
                                {index + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    <PaginationItem>
                        <PaginationNext
                            className="cursor-pointer"
                            onClick={(e) => {
                                e.preventDefault();
                                if (page < totalPages) setPage(page + 1);
                            }}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        );
    }, [page, totalPages]);

    return (
        <div className="w-full max-w-7xl mx-auto p-4 flex-grow flex flex-col">
            <div className="flex flex-row gap-8 items-center w-full mb-4 flex-wrap">
                <p className="text-2xl sm:text-2xl font-semibold">Manage your Jobs</p>
                <NewJobModal />
            </div>
            <div className={cn("jobs flex flex-col gap-3 overflow-y-scroll w-full max-h-[70vh] sm:max-h-[420px]")}>
                {
                    !fetchingJobs && jobs.length == 0 && (
                        <div className="flex flex-col justify-center items-center text-center text-4xl">
                            There is no Jobs!
                        </div>
                    )
                }
                {!fetchingJobs &&
                    jobs.map((job) => {
                        return (
                            <ManageJobsCard
                                job={job}
                                key={job.id}
                                setJobs={setJobs}
                            />
                        );
                    })}
                {fetchingJobs &&
                    [0, 1, 2, 3, 4, 5, 6].map((e, i) => <LoadingSkeleton key={e + i * 50} />)}
            </div>
            <div className="w-full flex justify-center mt-4">{renderPagination}</div>
        </div>
    );
};

function LoadingSkeleton() {
    return (
        <div className="max-w-full mx-auto h-fit w-full flex flex-col sm:flex-row items-start gap-4 border border-gray-200 rounded-md px-4 py-3">
            <div className="flex-shrink-0 p-2">
                <Skeleton className="h-16 w-16 sm:h-20 sm:w-20 rounded-full" />
            </div>
            <div className="p-2 flex-grow flex flex-col gap-1">
                <div className="flex flex-row gap-2 justify-between">
                    <Skeleton className="h-5 w-2/3 sm:h-6 sm:w-3/4" />
                    <div className="flex flex-row gap-2">
                        <Skeleton className="h-5 w-12 sm:h-6 sm:w-16" />
                        <Skeleton className="h-5 w-12 sm:h-6 sm:w-16" />
                    </div>
                </div>
                <Skeleton className="h-3 w-1/3 sm:h-4 sm:w-1/2" />
                <div className="flex items-center gap-2">
                    <Skeleton className="h-3 w-1/4 sm:h-4 sm:w-1/4" />
                    <Skeleton className="h-3 w-1/4 sm:h-4 sm:w-1/4" />
                </div>
                <div className="flex items-center justify-between w-full">
                    <Skeleton className="h-3 w-1/4 sm:h-4 sm:w-1/4" />
                    <Skeleton className="h-3 w-1/4 sm:h-4 sm:w-1/4" />
                </div>
            </div>
        </div>
    );
}

export default ManageJobsPage;
