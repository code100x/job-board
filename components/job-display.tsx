import { Job } from "@prisma/client";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardTitle,
} from "./ui/card";
import { Loader2, MapPin } from "lucide-react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { CardButton } from "./card-button";
import { Skeleton } from "./ui/skeleton";

type JobDisplayProps = {
  job: Job;
};

const boxVariant = cva("shrink-0 rounded-md p-2", {
  variants: {
    variant: {
      default: "bg-gray-500/20 hover:bg-gray-500/40",
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
            <span className="text-lg">{title}</span>
          </CardDescription>
        </div>
        <div
          className={cn(
            boxVariant({ variant: "default" }),
            "flex items-center justify-center size-sm"
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

export const JobLoading = () => {
  return (
    <>
      <Card className="border-none drop-shadow-lg my-4 border-b rounded-md hover:shadow-lg hover:bg-gray-50">
        <CardHeader className="flex flex-row items-center justify-between gap-x-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-8 lg:w-[120px] w-full" />
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div className="h-[50px] w-full flex items-center justify-center">
            <Loader2 className="h-6 w-6 text-slate-300 animate-spin" />
          </div>
        </CardContent>
      </Card>
      <Card className="border-none drop-shadow-lg my-4 border-b rounded-md hover:shadow-lg hover:bg-gray-50">
        <CardHeader className="flex flex-row items-center justify-between gap-x-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-8 lg:w-[120px] w-full" />
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div className="h-[50px] w-full flex items-center justify-center">
            <Loader2 className="h-6 w-6 text-slate-300 animate-spin" />
          </div>
        </CardContent>
      </Card>
      <Card className="border-none drop-shadow-lg my-4 border-b rounded-md hover:shadow-lg hover:bg-gray-50">
        <CardHeader className="flex flex-row items-center justify-between gap-x-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-8 lg:w-[120px] w-full" />
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div className="h-[50px] w-full flex items-center justify-center">
            <Loader2 className="h-6 w-6 text-slate-300 animate-spin" />
          </div>
        </CardContent>
      </Card>
      <Card className="border-none drop-shadow-lg my-4 border-b rounded-md hover:shadow-lg hover:bg-gray-50">
        <CardHeader className="flex flex-row items-center justify-between gap-x-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-8 lg:w-[120px] w-full" />
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div className="h-[50px] w-full flex items-center justify-center">
            <Loader2 className="h-6 w-6 text-slate-300 animate-spin" />
          </div>
        </CardContent>
      </Card>
      <Card className="border-none drop-shadow-lg my-4 border-b rounded-md hover:shadow-lg hover:bg-gray-50">
        <CardHeader className="flex flex-row items-center justify-between gap-x-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-8 lg:w-[120px] w-full" />
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div className="h-[50px] w-full flex items-center justify-center">
            <Loader2 className="h-6 w-6 text-slate-300 animate-spin" />
          </div>
        </CardContent>
      </Card>
    </>
  );
};
