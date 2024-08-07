"use client";
import { useSession } from "next-auth/react";
import { Job } from "@prisma/client";
import { EditJobModal } from "./EditJobModal";
import { Button } from "./ui/button";
import { usePathname } from 'next/navigation'
type CardButtonProps = {
  job: Job;
};

export const CardButton = ({ job }: CardButtonProps) => {
  const { data: session } = useSession();
  const pathname = usePathname()
  const userRole = session?.user.role;

  return (
    <>
      {userRole === "ADMIN" && (
        <>
          {job.state === "ACTIVE" ? (
            <div>
              <EditJobModal id={job.id} />
            </div>
          ) : (
            <div className="flex items-center justify-between gap-2">
              <EditJobModal id={job.id} />
              <Button variant={"default"}>Publish</Button>
            </div>
          )}
        </>
      )}
    </>
  );
};
