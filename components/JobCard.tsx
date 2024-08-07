import { relativeDate } from "@/lib/utils";
import { Job } from "@prisma/client";
<<<<<<< HEAD
import {
  Banknote,
  Briefcase,
  Clock,
  MapPin,
  SquareArrowOutUpRight,
} from "lucide-react";
import Link from "next/link";
=======
import { Banknote, MapPin, SquareArrowOutUpRight } from "lucide-react";
import {Slider} from "@/components/ui/slider";
>>>>>>> ef7acd5e2dc9a660f233907bebda64939c083201

type JobCardProps = {
  job: Job;
};

const JobCard = ({ job }: JobCardProps) => {
  const {
    title,
    description,
    companyName,
    salary,
    currency,
    location,
    type,
    createdAt,
  } = job;

  const currencySign = currency === "USD" ? "$" : "₹";

  return (
<<<<<<< HEAD
    <Link
      href={`/jobs/${job.id}`}
      className="h-fit w-5/6 flex items-start gap-4 border border-gray-200 hover:border-gray-300 transition-all shadow-sm rounded-md px-4 py-3"
    >
      <div className="logo-area p-2">
        <div className="h-20 w-20 bg-gray-100 border border-gray-300 rounded-full"></div>
      </div>
      <div className="p-2 h-full flex-grow flex flex-col gap-1">
        <div className="flex justify-between text-muted-foreground">
          <h3 className="text-lg tracking-tight font-semibold text-gray-700">
            {title}
          </h3>

          <p className="flex items-center gap-1.5 ">
            <Briefcase size={16} className="shrink-0" />
            {type}
          </p>
        </div>
        <h4 className="text-sm tracking-tight font-semibold text-gray-500">
=======
    <div className="max-w-full mx-auto h-fit w-full flex flex-col sm:flex-row items-start gap-4 border border-gray-200 hover:border-gray-300 transition-all shadow-sm rounded-md px-4 py-3">
      <div className="logo-area p-2 flex-shrink-0">
        <div className="h-20 w-20 bg-gray-100 border border-gray-300 rounded-full"></div>
      </div>
      <div className="p-2 h-full flex-grow flex flex-col gap-1">
        <h3 className="text-lg sm:text-xl tracking-tight font-semibold text-gray-700">
          {title}
        </h3>
        <h4 className="text-sm sm:text-base tracking-tight font-semibold text-gray-500">
>>>>>>> ef7acd5e2dc9a660f233907bebda64939c083201
          {companyName}
        </h4>
        <span className="flex items-end gap-2 text-gray-500">
          <Banknote className="text-gray-700" />
          <h4 className="text-sm sm:text-base tracking-tight font-medium">
            <span className="font-semibold">{currencySign}</span> {salary}
          </h4>
        </span>

        <div className="w-full flex flex-col sm:flex-row justify-between">
          <span className="flex items-end gap-2 text-gray-500">
            <MapPin className="text-gray-700" />
            <h4 className="text-sm sm:text-base tracking-tight font-medium">
              {location}
            </h4>
          </span>
<<<<<<< HEAD

          <span className="flex items-center gap-1.5 text-muted-foreground">
            <Clock size={16} />
            {relativeDate(createdAt)}
          </span>
=======
          <p className="flex gap-2 items-center cursor-pointer hover:underline mt-2 sm:mt-0">
            view details{" "}
            <span>
              <SquareArrowOutUpRight size={14} />
            </span>
          </p>

>>>>>>> ef7acd5e2dc9a660f233907bebda64939c083201
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
