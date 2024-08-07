"use client";
import { getJobs } from "@/actions/job";
import JobCard from "@/components/JobCard";
import Sidebar from "@/components/Sidebar";
import { JobDisplay } from "@/components/job-display";
import { prisma } from "@/lib/db";
import { cn } from "@/lib/utils";
import { Job } from "@prisma/client";
import { useEffect, useState } from "react";

const JobsPage = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
      const fetchJobs = async () =>{
        setLoading(true);
        const response = await getJobs({});
        if(response.status === "success"){
          setJobs(response.data as Job[]);
        }
        setLoading(false);
      };
      fetchJobs();
    },[])

  return (
    <div className="w-full">
      {jobs &&
        jobs.map((job) => {
          return <JobDisplay key={job.id} job={job} />;
        })}
      {jobs.length === 0 ? (
        <h3 className="text-2xl font-semibold text-gray-800">No Jobs Found!</h3>
      ) : null}
    </div>
  );
};

export default JobsPage;
