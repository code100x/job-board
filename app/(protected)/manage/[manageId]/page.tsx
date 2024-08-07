import { fetchJobDetails } from "@/actions/job";
import { Jobs } from "@/components/job";
import { prisma } from "@/lib/db";



export default async function Page() {

    const allJobs = await prisma.job.findMany({
        where: {},
      });
    return (
        <div>
           {/* <Jobs job={allJobs} /> */}
        </div>
    )
}
