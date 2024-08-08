import { prisma } from '@/lib/db'
import JobDetailsPage from '@/components/JobDetailsPage'
import { notFound } from 'next/navigation'

async function getJob(id: string) {
  const job = await prisma.job.findUnique({
    where: { id }
  })
  
  if (!job) {
    notFound()
  }
  
  return job
}

export default async function page({ params }: { params: { id: string } }) {
  const job = await getJob(params.id)
  
  return <JobDetailsPage job={job} />
}