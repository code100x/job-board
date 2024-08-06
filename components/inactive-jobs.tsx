import { CardWrapper } from "./card-wrapper";
import { JobDisplay } from "./job-display";
import { prisma } from "@/lib/db";

export const InActiveJobs = async () => {
  const allJobs = await prisma.job.findMany({
    where: {
      state: "INACTIVE",
    },
  });
  return (
    <div>
      <CardWrapper cols={1} title={"Unpublished jobs"}>
        {allJobs.map((job) => (
          <JobDisplay key={job.id} job={job} />
        ))}
      </CardWrapper>
    </div>
  );
};
