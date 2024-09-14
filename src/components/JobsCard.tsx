import Link from 'next/link';
import React from 'react';
import Icon from './ui/icon';
import { formatSalary } from '@/lib/utils';

interface JobsData {
  id: string;
  title: string;
  companyName: string;
  location: string;
  workMode: string;
  minSalary: number | null;
  maxSalary: number | null;
  description: string | null;
}

const JobsCard = ({
  id,
  title,
  companyName,
  location,
  workMode,
  minSalary,
  maxSalary,
  description,
}: JobsData) => {
  return (
    <Link href={`/jobs/${id}`}>
      <div
        className="w-[94%] mx-auto flex flex-col items-start gap-4 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent"
        key={id}
      >
        <div className="flex w-full flex-col gap-2">
          <p className="font-semibold">{title}</p>
          <p className="text-xs font-medium">{companyName}</p>
        </div>
        <div className="flex gap-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-0.5">
            <Icon icon="location" size={12} />
            {location} <span className="capitalize">({workMode})</span>
          </span>
          <span className="flex items-center gap-0.5">
            {minSalary && <Icon icon="currency" size={12} />}
            {minSalary && maxSalary
              ? `${formatSalary(minSalary)}-${formatSalary(maxSalary)}`
              : 'Not disclosed'}
          </span>
        </div>
        <p className="flex gap-0.5 items-center text-muted-foreground text-xs">
          <Icon icon="description" size={12} />
          <span>{description}</span>
        </p>
      </div>
    </Link>
  );
};

export default JobsCard;
