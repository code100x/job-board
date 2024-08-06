import { auth } from "@/auth";
import NewJobModal from "@/components/NewJobModal";
import { redirect } from "next/navigation";
import ManageJobsCard from "@/components/ManageJobsCard";
import { prisma } from "@/lib/db";
import { cn } from "@/lib/utils";

const ManageJobsPage = async () => {
    const session = await auth();
    const role = session?.user.role;

    if (role !== "ADMIN") {
        redirect("/");
    }
    const jobs = await prisma.job.findMany({});
    console.log("jobs", jobs);
    return (
        <div className="w-1/2 flex-grow justify-center items-center p-2 flex flex-col">
            <div className="flex flex-row gap-8 items-center w-full mb-4">
                <p className="text-3xl font-semibold">Manage your Jobs</p>
                <NewJobModal />
            </div>
            <div className={cn("jobs flex flex-col max-h-[420px] gap-3 overflow-y-scroll w-full")}>
                {jobs.map((job) => {
                    return <ManageJobsCard job={job} key={job.id} />;
                })}
            </div>
        </div>
    );
};

export default ManageJobsPage;
