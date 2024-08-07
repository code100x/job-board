"use client";
import { useEffect, useState } from "react";
import { CardWrapper } from "./card-wrapper";
import { JobDisplay } from "./job-display";
import { Job } from "@prisma/client";
import { fetchInActiveJobs } from "@/actions/job";

export const InActiveJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      //@ts-ignore
      const response = await fetchInActiveJobs();
      if (response.status === "success") {
        //@ts-ignore
        setJobs(response.data);
      }
      setLoading(false);
    };

    fetchJobs();
  }, []);

  return (
    <div>
      <CardWrapper cols={1} title={"Unpublished jobs"}>
        {jobs.map((job) => (
          <JobDisplay key={job.id} job={job} />
        ))}
      </CardWrapper>
    </div>
  );
};
