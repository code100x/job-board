"use client";
import { useSession } from "next-auth/react";
import { Job } from "@prisma/client";
import { EditJobModal } from "./EditJobModal";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import {updateStatus} from "@/actions/job";
import { toast } from "./ui/use-toast";

type CardButtonProps = {
  job: Job;
};

export const CardButton = ({ job }: CardButtonProps) => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const userRole = session?.user.role;
  
  const handleClick = async () => {
    try {
      const response = await updateStatus(job);
      if (response.status === 'success') {
        toast({
          title: response.message,
          variant: "default",
        });
        return;
      }
      toast({
        title: response.message,
        variant: "default",
      });
    } catch (error) {
      console.error("Failed to update job status", error);
    }
  };

  if(userRole === "ADMIN"){
    return (
      <>
        {job.status === "INACTIVE" ? (
          <div className="">
            <EditJobModal id={job.id} />
            <Button className="mt-2" onClick={handleClick} variant={"default"}>Publish</Button>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-2">
            <EditJobModal id={job.id} />
          </div>
        )}
      </>
    );
  } 
  return(
    ""
  )
  };



