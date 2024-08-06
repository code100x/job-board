import { Job } from "@prisma/client";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardTitle,
} from "./ui/card";
import { MapPin } from "lucide-react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
type JobDisplayProps = {
  job: Job;
};

const boxVariant = cva("shrink-0 rounded-md p-3", {
  variants: {
    variant: {
      default: "bg-blue-500/20",
      remote: "bg-emerald-500/20",
      hybrid: "bg-rose-500/20",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
export const JobDisplay = ({ job }: JobDisplayProps) => {
  const { title, companyName } = job;
  return (
    <Card className="border-none drop-shadow-lg my-4 border-b hover:shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between gap-x-4">
        <div className="space-y-2">
          <CardTitle className="text-2xl">{companyName}</CardTitle>
          <CardDescription className=" line-clamp-1">
            {" "}
            <h1 className="text-md">{title}</h1>
          </CardDescription>
        </div>
        <div
          className={cn(
            boxVariant({ variant: "remote" }),
            "flex items-center justify-center hover:bg-emerald-500/40"
          )}
        >
          <MapPin className="text-gray-700 mr-2" />
          <h1 className="text-sm">{job.location}</h1>
        </div>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <div>
          <h1 className="mb-2 line-clamp-1 font-semibold">
            {job.currency} {job.salary}
          </h1>
          <p className="line-clamp-1">{job.description}</p>
        </div>
        {job.state === "ACTIVE" ? (
          <div>
            <Button variant={"outline"} size={"sm"}>
              Edit
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-2">
            <Button variant={"outline"} size={"sm"}>
              Edit
            </Button>
            <Button variant={"default"}>Publish</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
