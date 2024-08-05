import Header from "@/components/header";
import Footer from "@/components/footer";
import Filters from "@/components/filters";
import JobCard from "@/components/job-card";
import { auth } from "@/auth";
import prisma from "@/prisma/db";

export default async function JobsPage() {
  const jobs = await prisma.job.findMany({
    where: {},
  });
  const session = await auth();

  if (!session) return null;

  return (
    <div className="flex flex-col min-h-screen">
      <Header session={session} />
      <main className="flex-1 py-8 md:py-12 lg:py-16">
        <div className="container grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
          <Filters />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <JobCard
                  key={job.id}
                  title={job.title}
                  description={job.description}
                  type={job.type}
                  location={job.location}
                  salaryRange={job.salaryRange}
                  experience={job.experience}
                  companyName={job.companyName}
                  companyLogo={job.companyLogo}
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold">No jobs found</h1>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
