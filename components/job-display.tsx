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
import { CardButton } from "./card-button";

type JobDisplayProps = {
  job: Job;
};

const boxVariant = cva("shrink-0 rounded-md p-3", {
  variants: {
    variant: {
      default: "bg-blue-500/20 hover:bg-blue-500/40",
      remote: "bg-emerald-500/20 hover:bg-emerald-500/40",
      hybrid: "bg-rose-500/20 hover:bg-rose-500/40",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const JobDisplay = ({ job }: JobDisplayProps) => {
  const { title, companyName } = job;
  return (
    <Card className="border-none drop-shadow-lg my-4 border-b rounded-md hover:shadow-lg hover:bg-gray-50">
      <CardHeader className="flex flex-row items-center justify-between gap-x-4">
        <div className="space-y-2">
          <CardTitle className="text-2xl line-clamp-1">{companyName}</CardTitle>
          <CardDescription className=" line-clamp-1">
            <h1 className="text-lg">{title}</h1>
          </CardDescription>
        </div>
        <div
          className={cn(
            boxVariant({
              variant:
                job.location === "onsite"
                  ? "default"
                  : job.location === "remote"
                  ? "remote"
                  : job.location === "hybrid"
                  ? "hybrid"
                  : "default",
            }),
            "flex items-center justify-center"
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
          <h1 className="line-clamp-3">{job.description}</h1>
        </div>
        <CardButton job={job} />
      </CardContent>
    </Card>
  );
};
