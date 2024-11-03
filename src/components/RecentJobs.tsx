'use client';
import { getRecentJobs, GetUserBookmarksId } from '@/actions/job.action';
import JobCard from './Jobcard';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

export default function RecentJobs() {
  // const [recentJobs, getUserBookmarks] = await Promise.all([
  //   await getRecentJobs(),
  //   await GetUserBookmarksId(),
  // ]);
  const session = useSession();

  const { data } = useQuery({
    queryKey: ['recentJobs'],
    queryFn: () => getRecentJobs(),
    staleTime: 1000 * 60 * 5,
  });
  const bookmarks = useQuery({
    queryKey: ['UserBookmarksId', session?.data?.user?.id],
    queryFn: () => GetUserBookmarksId(),
  });
  if (!data?.status || !data?.additional) {
    return <div>Error {data?.message}</div>;
  }
  const recentJobs = data;

  const userbookmarkArr: { jobId: string }[] | null =
    bookmarks.data?.data || null;

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
