import { getJobById } from '@/actions/job.action';
import { Job } from '@/components/job';
import { JobByIdSchemaType } from '@/lib/validators/jobs.validator';
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

  return (
    <div className="flex justify-center p-7 m-10">
      <Job job={jobDetail} />
    </div>
  );
};

export default page;
