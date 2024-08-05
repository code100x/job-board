import { auth } from "@/auth";
import NewJobModal from "@/components/NewJobModal";
import { redirect } from "next/navigation";

const ManageJobsPage = async () => {

    const session = await auth();
    const role = session?.user.role;

    if(role !== "ADMIN") {
        redirect("/")
    }

    return (
        <div className="w-full flex-grow flex justify-center items-center p-2">
            <NewJobModal />
        </div>
    )
}

export default ManageJobsPage;