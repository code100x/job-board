import { CardWrapper } from "./card-wrapper";
import { JobDisplay } from "./job-display";
import { prisma } from "@/lib/db";

export const ActiveJobs = async () => {
  const allJobs = await prisma.job.findMany({
    where: {
      state: "ACTIVE",
    },
  });
  return (
    <div>
      <CardWrapper cols={3} title={"Published jobs"}>
        {allJobs.map((job) => (
          <JobDisplay key={job.id} job={job} />
        ))}
      </CardWrapper>
    </div>
  );
};
