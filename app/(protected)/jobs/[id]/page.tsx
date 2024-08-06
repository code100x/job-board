import { getJob } from "@/actions/job";
import JobPageCard from "@/components/JobPageCard";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/db";
import { Job } from "@prisma/client";

interface Props {
  params: {
    id: string;
  };
}

const JobIdPage = async ({ params: { id } }: Props) => {
  const job = (await getJob(id)) as Job;

  return (
    <main className="m-auto my-10 flex max-w-5xl flex-col items-center gap-5 px-3 md:flex-row md:items-start">
      <JobPageCard job={job} />
      <aside>
        <Button asChild>
          <a className="w-40 md:w-fit">Apply now</a>
        </Button>
      </aside>
    </main>
  );
};
export default JobIdPage;
