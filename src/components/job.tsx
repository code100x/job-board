import { JobType } from '@/types/jobs.types';
import Icon from './ui/icon';
import { formatSalary } from '@/lib/utils';
import { Button } from './ui/button';
import Linkify from 'linkify-react';
const options = {
  defaultProtocol: 'https',
  target: '_blank',
};
export const Job = ({ job }: { job: JobType }) => {
  return (
    <section className="grid gap-5 border p-3 rounded-lg">
      <div className="grid gap-2">
        <p className="font-bold text-2xl ">{job.title}</p>
        <p className="text-xl text-primary/80">{job.companyName}</p>
        <div className="flex gap-2">
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
      </div>
      <Button className="justify-self-start">Apply</Button>
      <Linkify options={options}>
        <p>{job.description}</p>
      </Linkify>
    </section>
  );
};
