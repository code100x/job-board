'use client';
import { getRecommendedJobs } from '@/actions/job.action';
import { useQuery } from '@tanstack/react-query';
import JobCard from './Jobcard';
import { useParams } from 'next/navigation';

export const RecommendJobs = ({ jobId }: { jobId: string }) => {
  const params = useParams();
  const { data } = useQuery({
    queryKey: ['RecommendedJobs', params],
    queryFn: () => getRecommendedJobs({ id: jobId }),
    staleTime: 1000 * 60 * 5,
  });

  if (!data?.status) {
    return <div>Error </div>;
  }
  const recommendedJobs = data?.additional?.jobs;

  return (
    <main className="my-2 flex flex-col gap-4">
      {recommendedJobs &&
        recommendedJobs.map((job, index) => {
          return (
            <JobCard
              isBookmarked={false}
              key={`recommended_job_${index}`}
              job={job}
            />
          );
        })}
    </main>
  );
};
