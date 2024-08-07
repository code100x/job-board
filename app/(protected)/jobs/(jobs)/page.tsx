"use client";
import { getJobs } from "@/actions/job";
import Sidebar from "@/components/Sidebar";
import { JobDisplay, JobLoading } from "@/components/job-display";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Job } from "@prisma/client";
import { useEffect, useState } from "react";

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

  if (loading) {
    return (
      <main className="max-w-full mx-2">
        <div className="flex">
          <div className="w-64 pr-4 shrink-0 hidden md:block mt-4">
            <Sidebar setJobs={setJobs} setLoading={setLoading} />
          </div>
          <div className="w-full">
            {jobs &&
              jobs.map((job) => {
                return <JobLoading key={job.id} />;
              })}
            {jobs.length === 0 ? <JobLoading /> : null}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-full mx-2">
      <div className="flex">
        <div className="w-64 pr-4 shrink-0 hidden md:block mt-4">
          <Sidebar setJobs={setJobs} setLoading={setLoading} />
        </div>
        <div className="w-full">
          {jobs &&
            jobs.map((job) => {
              return <JobDisplay key={job.id} job={job} />;
            })}
          {jobs.length === 0 ? (
            <Card className="w-full h-screen mt-4">
              <CardHeader>
                <CardTitle>
                  <span>No published job</span>
                </CardTitle>
              </CardHeader>
            </Card>
          ) : null}
        </div>
      </div>
    </main>
  );
};

export default JobsPage;
