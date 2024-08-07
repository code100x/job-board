import JobCard from "@/components/JobCard";
import Sidebar from "@/components/Sidebar";
import { JobDisplay } from "@/components/job-display";
import { prisma } from "@/lib/db";
import { cn } from "@/lib/utils";

const JobsPage = async () => {
  const allJobs = await prisma.job.findMany({
    where: {
      state: "ACTIVE",
    },
  });

  return (
    <div className="w-full">
      {allJobs &&
        allJobs.map((job) => {
          return <JobDisplay key={job.id} job={job} />;
        })}
      {allJobs.length === 0 ? (
        <h3 className="text-2xl font-semibold text-gray-800">No Jobs Found!</h3>
      ) : null}
    </div>
  );
};

export default JobsPage;
