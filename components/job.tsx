"use client";
import { useEffect, useState } from "react";
import { JobDisplay } from "./job-display";
import { fetchJobDetails } from "@/actions/job";
import { NewJob } from "@/zod/job";
import { toast } from "./ui/use-toast";
import { Job } from "@prisma/client";
type JobProps = {
    job: Job;
  };

export const Jobs = async ({job}:JobProps) =>{
    const [jobDetails, setJobDetails] = useState<NewJob | null>(null);
    
    useEffect(() => {
        const getJobDetails = async () => {
            const id = job.id;
          const response = await fetchJobDetails({ id });
          if (response.status === "success") {
            setJobDetails(response.data || null);
          } else {
            console.log(response.message);
            toast({
              title: "Failed to fetch job details",
              variant: "destructive",
            });
          }
        };
        getJobDetails();
      }, []);
    return(
        <div>
            {jobDetails?.companyName}
        </div>
    )
}



