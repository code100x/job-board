import { getAllJobs } from '@/actions/job.action';
import { formatSalary } from '@/lib/utils';
import Link from 'next/link';
import Icon from './ui/icon';
import { JobType } from '@/types/jobs.types';
import { DEFAULT_PAGE } from '@/config/app.config';

export const JobLanding = async () => {
  const jobs = await getAllJobs({
    sortby: 'postedat_desc',
    page: DEFAULT_PAGE,
    limit: 9,
  });
  if (!jobs.status) {
    return;
  }
  const allJobs = jobs.additional?.jobs || [];

  return (
    <div className="max-w-screen-lg mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-8 pt-10">
      {allJobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};

const JobCard = ({ job }: { job: JobType }) => {
  return (
    <Link href={`/jobs/${job.id}`}>
      <div className="flex flex-col items-start gap-4 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent bg-background">
        <div className="flex w-full flex-col gap-2">
          <p className="font-semibold">{job.title}</p>
          <p className="text-xs font-medium">{job.companyName}</p>
        </div>
        <div className="flex gap-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-0.5">
            <Icon icon="location" size={12} />
            {job.workMode}
          </span>
          <span className="flex items-center gap-0.5">
            {job.minSalary && <Icon icon="currency" size={12} />}
            {job.minSalary && job.maxSalary
              ? `${formatSalary(job.minSalary)}-${formatSalary(job.maxSalary)}`
              : 'Not disclosed'}
          </span>
        </div>
        <p className="flex gap-0.5 items-center text-muted-foreground text-xs">
          <Icon icon="description" size={12} />
          <span className="line-clamp-1">{job.description}</span>
        </p>
      </div>
    </Link>
  );
};
