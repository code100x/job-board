import { JobType } from '@/types/jobs.types';
import Icon from './ui/icon';
import { formatSalary } from '@/lib/utils';
import { Button } from './ui/button';

export const Job = ({ job }: { job: JobType }) => {
  return (
    <section className="p-5 m-5 grid gap-5 border border-white-200 border-[1px] rounded-3xl min-h-[55vh] min-w-[25vw] hover:shadow-[0_2px_15px_7px_rgba(0,119,255,0.5)] transition-shadow duration-300 shadow-lg w-full max-w-md mx-auto bg-[#171717]">
      <div className="grid gap-2">
        <p className="font-bold text-3xl text-center content-center">
          {job?.title || 'Unknown Job Title'}
        </p>
        <p className="text-xl text-primary/80 text-center content-center">
          {job?.companyName || 'Unknown Company'}
        </p>
        <div className="flex gap-2 justify-center text-center items-center">
          <span className="flex items-center gap-0.5">
            <Icon icon="location" size={12} />
            {job?.workMode || 'Unknown Work Mode'}
          </span>
          <span className="flex items-center gap-0.5">
            {job?.minSalary && <Icon icon="currency" size={12} />}
            {job?.minSalary && job?.maxSalary
              ? `${formatSalary(job.minSalary)} - ${formatSalary(job.maxSalary)}`
              : 'Salary Not Disclosed'}
          </span>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <Button className="align-center">Apply</Button>
      </div>

      <div className="flex justify-center">
        <p className="text-center">
          {job?.description
            ? job.description.length > 300
              ? job.description.slice(0, 300) + '...'
              : job.description
            : 'No job description provided.'}
        </p>
      </div>
    </section>
  );
};
