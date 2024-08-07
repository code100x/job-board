import { auth } from "@/auth";

import { redirect } from "next/navigation";
import { ActiveJobs } from "@/components/active-jobs";
import { InActiveJobs } from "@/components/inactive-jobs";

const ManageJobsPage = async () => {
  const session = await auth();
  const role = session?.user.role;



  if (role !== "ADMIN") {
    redirect("/");
  }
  return (
    <div className="max-w-screen-2xl mx-auto w-full mt-4">
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
        <div className="col-span-1 lg:col-span-4 ml:col-span-2">
          <ActiveJobs />
        </div>
        <div className="col-span-1 lg:col-span-3 xl:col-span-2">
          <InActiveJobs />
        </div>
      </div>
    </div>
  );
};

export default ManageJobsPage;
