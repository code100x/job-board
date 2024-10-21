import { getRecentJobs, GetUserBookmarksId } from '@/actions/job.action';
import JobCard from './Jobcard';

export default async function RecentJobs() {
  const [recentJobs, getUserBookmarks] = await Promise.all([
    await getRecentJobs(),
    await GetUserBookmarksId(),
  ]);

  const userbookmarkArr: { jobId: string }[] | null = getUserBookmarks.data;

  if (!recentJobs.status) {
    return <div>{recentJobs.message}</div>;
  }

  return (
    <div className="w-full grid md:grid-cols-3 grid-cols-1 gap-6 items-center mt-10">
      {recentJobs.additional.recentJobs.map((job, index) => (
        <JobCard
          job={job}
          key={index}
          className="min-h-[210px]"
          isBookmarked={
            userbookmarkArr?.some((e) => e.jobId === job.id) || false
          }
        />
      ))}
    </div>
  );
}
