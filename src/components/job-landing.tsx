import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { ChevronRight } from 'lucide-react';
import RecentJobs from './RecentJobs';
import Link from 'next/link';
import getQueryClient from '@/providers/queryClient';
import { GetUserBookmarksId, getRecentJobs } from '@/actions/job.action';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getServerSession } from 'next-auth';
dayjs.extend(relativeTime);

export const calculateTimeSincePosted = (postedAt: Date): string => {
  return dayjs(postedAt).fromNow();
};

export const getFirstLetterCaps = (str: string): string => {
  return str.charAt(0).toUpperCase();
};

export const JobLanding = async () => {
  const session = await getServerSession();
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['recentJobs'],
    queryFn: () => getRecentJobs(),
    staleTime: 1000 * 60 * 5,
  });
  await queryClient.prefetchQuery({
    queryKey: ['UserBookmarksId', session?.user?.id],
    queryFn: () => GetUserBookmarksId(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div
        id="recent-jobs"
        className="w-full h-fit md:px-16 px-5 flex flex-col items-center pt-6 md:pt-20 dark:bg-grad-dark bg-grad-light"
      >
        <div className="w-full h-fit flex flex-col items-center">
          <h2 className="font-bold md:text-4xl text-3xl">
            Recently Added jobs
          </h2>
          <p className="md:text-sm text-xs py-2 font-semibold text-[#64748B] dark:text-[#94A3B8]">
            Stay ahead with newly added jobs
          </p>
        </div>
        <RecentJobs />
        <div className="w-full flex justify-center items-center my-5">
          <button
            className="flex items-center text-[#4E7AFF] border-none outline-none text-lg font-medium group"
            aria-label="view-all-jobs"
          >
            <Link href={'/jobs'} className="flex items-center">
              View all jobs
              <ChevronRight className="w-4 h-4 mx-2 group-hover:translate-x-1 duration-200 ease-in-out transition" />
            </Link>
          </button>
        </div>
      </div>
    </HydrationBoundary>
  );
};
