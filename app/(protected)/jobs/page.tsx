"use client";

import { useState, useEffect } from "react";
import JobCard from "@/components/JobCard";
import Sidebar from "@/components/Sidebar";
import { cn } from "@/lib/utils";
import { getJobs } from "@/actions/job";
import { Job } from "@prisma/client";

const JobsPage = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchJobs = async () => {
            setLoading(true);
            //@ts-ignore
            const response = await getJobs({});
            if (response.status === "success") {
                //@ts-ignore
                setJobs(response.data);
            }
            setLoading(false);
        };

        fetchJobs();
    }, []);

    return (
        <section className="relative w-full h-fit flex gap-2 flex-grow p-2">
            <Sidebar setJobs={setJobs} setLoading={setLoading} />
            <section className="w-full h-fit flex flex-col gap-8 rounded-md py-4 px-6">
                <div className="flex flex-col gap-1">
                    <h3 className="lg:text-5xl text-gray-900 tracking-tight font-semibold">
                        All Developer Jobs
                    </h3>
                    <p className="lg:text-lg font-medium text-gray-500 tracking-tighter">
                        Amplify Your Career: Where Top Developers Meet 100x Opportunities
                    </p>
                </div>
                <div
                    className={cn(
                        "jobs flex flex-col max-h-[420px] gap-3 overflow-y-scroll",
                        {
                            "h-[420px] flex justify-center items-center": jobs.length === 0 && !loading,
                        }
                    )}
                >
                    {loading ? (
                        <h3 className="text-2xl font-semibold text-gray-800">Loading...</h3>
                    ) : jobs.length === 0 ? (
                        <h3 className="text-2xl font-semibold text-gray-800">No Jobs Found!</h3>
                    ) : (
                        jobs.map((job) => <JobCard key={job.id} job={job} />)
                    )}
                </div>
            </section>
        </section>
    );
};

export default JobsPage;
