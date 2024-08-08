"use client"
import NewJobModal from "@/components/NewJobModal";
import { redirect } from "next/navigation";
import ManageJobsCard from "@/components/ManageJobsCard";
import { cn } from "@/lib/utils";
import {useSession} from "@/hooks/useSession";
import {useCallback, useEffect, useState} from "react";
import {Job} from "@prisma/client";
import {getAllJobsForAdmin} from "@/actions/job";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink, PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";


const ManageJobsPage =  () => {
    const session = useSession();
    const user = session.session?.user;
    const [page, setPage] = useState(1);
    const [pageSize] = useState(10); // Define the number of jobs per page
    const [totalPages, setTotalPages] = useState(1);
    const role = user?.role;
    const [fetchingJobs, setFetchingJobs] = useState<boolean>(false);
    const [jobs,setJobs] = useState<Job[]>([]);
    if (role && role !== "ADMIN") {
        redirect("/");
    }
    const fetchData = useCallback(async ()=>{
        setFetchingJobs(true);
        const res = await getAllJobsForAdmin({page,pageSize});
        if (res.status === "success") {
            setJobs(res.data as Job[]);
            setTotalPages(res.totalPages as number);
            console.log("jobs ",jobs)
        }
        setFetchingJobs(false);
    },[page,pageSize])

    useEffect(() => {
        fetchData()
    }, [fetchData]);

    return (
        <div className="w-1/2 flex-grow justify-center items-center p-2 flex flex-col">
            <div className="flex flex-row gap-8 items-center w-full mb-4">
                <p className="text-3xl font-semibold">Manage your Jobs</p>
                <NewJobModal />
            </div>
            <div className={cn("jobs flex flex-col max-h-[420px] gap-3 overflow-y-scroll w-full")}>
                {jobs.map((job) => {
                    return <ManageJobsCard job={job} key={job.id} setJobs={setJobs}/>;
                })}
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious

                                className={"cursor-pointer"}
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (page > 1) setPage(page - 1);
                                }}
                            />
                        </PaginationItem>
                        {[...Array(totalPages)].map((_, index) => (
                            <PaginationItem key={index}>
                                <PaginationLink
                                    className={"cursor-pointer"}
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
                                className={"cursor-pointer"}
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (page < totalPages) setPage(page + 1);
                                }}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
};

export default ManageJobsPage;
