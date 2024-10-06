import { getRecentJobs } from '@/actions/job.action';
import JobCard from './Jobcard';

export default async function RecentJobs() {
  const recentJobs = await getRecentJobs();
  if (!recentJobs.status) {
    return <div>{recentJobs.message}</div>;
  }

  return (
    <div className="w-full grid md:grid-cols-3 grid-cols-1 gap-6 items-center mt-10">
      {recentJobs.additional.recentJobs.map((job, index) => (
        <JobCard job={job} key={index} className="min-h-[210px]" />
      ))}
    </div>
  );
}
