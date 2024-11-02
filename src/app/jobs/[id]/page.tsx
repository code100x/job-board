import { getJobById, getRecommendedJobs } from '@/actions/job.action';
import { Job } from '@/components/job';
import { JobByIdSchemaType } from '@/lib/validators/jobs.validator';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import getQueryClient from '../../../providers/queryClient';
import { RecommendJobs } from '@/components/RecommendJobs';

const page = async ({ params }: { params: JobByIdSchemaType }) => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['jobs', params],
    queryFn: () => getJobById({ id: params.id }),
    staleTime: 1000 * 60 * 5,
  });

  await queryClient.prefetchQuery({
    queryKey: ['RecommendedJobs', params],
    queryFn: () => getRecommendedJobs({ id: params.id }),
    staleTime: 1000 * 60 * 5,
  });

  // const job = await getJobById(params);
  // if (!job.status) {
  //   return;
  // }

  // const jobDetail = job.additional?.job;
  // if (!jobDetail) {
  //   return redirect('/jobs');
  // }

  // const curatedJobs = await getRecommendedJobs({
  //   id: jobDetail.id,
  //   category: jobDetail.category,
  // });

  // if (!curatedJobs.status) {
  //   return;
  // }

  // const recommendedJobs = curatedJobs.additional?.jobs;

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="container max-w-8xl h-fit mx-auto my-8">
        <section className="flex  h-fit py-4">
          <Link
            href="/jobs"
            className="flex border-2 border-transparent cursor-pointer h-fit p-2 rounded-full px-4 transition-all duration-450 ease-linear hover:border-2 hover:bg-[#F1F5F9] dark:hover:bg-[#0F172A] items-center gap-2"
          >
            <ArrowLeft size={18} />
            <p className="text-xs">Back to All Jobs</p>
          </Link>
        </section>
        <main className="grid grid-cols-1 lg:grid-cols-6 gap-8">
          {/* the particular job details */}

          <Job />

          {/* job recommendations */}
          <aside className="col-span-1 rounded-md lg:col-span-2">
            <div className="sticky top-4">
              <h2 className="text-xl font-semibold mb-4">
                Recommended for you
              </h2>
              <RecommendJobs jobId={params.id} />
            </div>
          </aside>
        </main>
      </div>
    </HydrationBoundary>
  );
};

export default page;
