import { BriefcaseIcon, DollarSignIcon, LocateIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function JobCard({
  title,
  description,
  type,
  location,
  salaryRange,
  experience,
  companyName,
  companyLogo,
}: JobCardProps) {
  return (
    <div className="bg-background rounded-lg shadow overflow-hidden">
      <Link href="#" className="block" prefetch={false}>
        <div className="relative">
          <Image
            src={companyLogo}
            alt="Company Logo"
            width={400}
            height={200}
            className="w-full h-40 object-cover"
            style={{ aspectRatio: "400/200", objectFit: "cover" }}
          />
          <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-md text-xs font-medium">
            {type
              .split("_")
              .map(
                (word) =>
                  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
              )
              .join(" ")}
          </div>
        </div>
        <div className="p-4 space-y-2">
          <h3 className="text-lg font-semibold">{title}</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <BriefcaseIcon className="w-4 h-4" />
            <span>{companyName}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <LocateIcon className="w-4 h-4" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <DollarSignIcon className="w-4 h-4" />
            <span>{salaryRange}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <BriefcaseIcon className="w-4 h-4" />
            <span>
              {experience.charAt(0).toUpperCase() +
                experience.slice(1).toLowerCase() +
                " Level"}
            </span>
          </div>
          <p className="line-clamp-2">{description}</p>
        </div>
      </Link>
    </div>
  );
}
