'use client';

import { GetBookmarkByUserId } from '@/actions/job.action';
import BookmarkCardSkeleton from '@/components/BookmarkCardSkeletion';
import JobCard from '@/components/Jobcard';

import { JobType } from '@/types/jobs.types';
import { useEffect, useState } from 'react';

export default function BookmarkPage() {
  const [loading, setLoading] = useState(true);
  const [errorNoPost, setErrorNoPost] = useState(false);
  const [bookmarkedJobs, setBookmarkedJobs] = useState<
    {
      job: JobType;
    }[]
  >();

  useEffect(() => {
    const getBookmark = async () => {
      setLoading(true);
      try {
        const response = await GetBookmarkByUserId();
        if (response.status !== 200 || !response.data) {
          return setErrorNoPost(true);
        }
        setBookmarkedJobs(response.data);
      } finally {
        setLoading(false);
      }
    };
    getBookmark();
  }, []);

  return (
    <div className="md:container flex flex-col w-full">
      <div className="flex justify-between items-center">
        <span>Bookmarks</span>
      </div>

      {loading ? (
        <div className="space-y-4 w-full">
          {[1, 2, 3, 4, 5].map((e: number) => (
            <BookmarkCardSkeleton key={e} />
          ))}
        </div>
      ) : (
        <>
          {errorNoPost ? (
            <div className="w-full h-screen flex items-center justify-center text-white">
              <p>No Bookmarks found</p>
            </div>
          ) : (
            <div className="h-full overflow-y-scroll no-scrollbar flex flex-col gap-8 my-3">
              {bookmarkedJobs?.map(({ job }, index) => {
                return (
                  <JobCard
                    job={job}
                    key={index}
                    className="w-full"
                    isBookmarked={true}
                  />
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
