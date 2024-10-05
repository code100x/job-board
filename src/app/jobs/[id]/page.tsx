import { getJobById, getRecommendedJobs } from '@/actions/job.action';
import { Job } from '@/components/job';
import JobCard from '@/components/job-card';
import { JobByIdSchemaType } from '@/lib/validators/jobs.validator';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const page = async ({ params }: { params: JobByIdSchemaType }) => {
  const job = await getJobById(params);

  if (!job.status) {
    return;
  }

  const jobDetail = job.additional?.job;
  if (!jobDetail) {
    return redirect('/jobs');
  }

  const curatedJobs = await getRecommendedJobs({
    id: jobDetail.id,
    category: jobDetail.category,
  });

  if (!curatedJobs.status) {
    return;
  }

  const recommendedJobs = curatedJobs.additional?.jobs;

  return (
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
        <Job job={jobDetail} />

        {/* job recommendations */}
        <aside className="col-span-1 rounded-md lg:col-span-2">
          <div className="sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Recommended for you</h2>
            <main className="my-2 flex flex-col gap-4">
              {recommendedJobs &&
                recommendedJobs.map((job, index) => {
                  return <JobCard key={`recommended_job_${index}`} job={job} />;
                })}
            </main>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default page;
