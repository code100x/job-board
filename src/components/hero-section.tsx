import Image from 'next/image';
import { trustedCompanies } from '@/lib/constant/app.constant';
import Link from 'next/link';
const HeroSection = () => {
  return (
    <>
      <section className="relative container min-w-full pb-10 h-fit py-10 dark:bg-hero-bg-dark bg-hero-bg-light object-contain">
        <div className="flex flex-col items-center pt-10">
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center">
              <p className="py-2 px-3 rounded-full border text-sm my-4 dark:text-[#FFFF] text-[#020817] dark:bg-[#0F172A] dark:border-[#1E293B] bg-[#F1F5F9] border-[#E2E8F0]">
                <span className="text-[#3259E8]">#1</span> Platform for jobs
              </p>
              <h1 className="text-5xl font-bold leading-snug text-center dark:text-[#F8FAFC] text-[#020817]">
                Build Your
                <span className="career-span bg-[#3259E8] py-1 px-5 ml-1 font-bold rounded-xl text-white">
                  Career
                </span>
                <br />
                with 100xJobs
              </h1>
              <p className="md:w-4/6 w-full text-center my-3 dark:text-[#94A3B8] text-[#64748B] font-medium ">
                Unlock exclusive job and internship opportunities. Remote,
                onsite, or hybrid—we&apos;ve got what you&apos;re looking for.
              </p>
            </div>
            <div className="md:w-4/6 w-full flex md:flex-row flex-col  items-center justify-center my-4">
              <Link
                href={'/jobs'}
                aria-label="explore-jobs"
                className="md:w-fit w-full rounded-lg py-2 px-3 bg-[#3259E8] text-sm text-[#FFFF] font-medium hover:bg-[#3e63e9] text-center"
              >
                Explore Jobs
              </Link>
              <Link
                href={'#testimonials'}
                className="md:w-fit w-full rounded-lg py-2 px-3 border text-sm md:ml-3 md:my-0 my-3 bg-transparent dark:bg-slate-900 dark:text-[#94A3B8] text-[#64748B] font-medium   dark:hover:bg-slate-900 hover:bg-slate-100 text-center"
                aria-label="view-testimonals"
              >
                View Testimonials
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-center my-5">
            <p className="border border-[#4E7AFF] rounded-lg bg-opacity-10 py-1 px-3 text-[#4E7AFF] text-xs w-fit font-medium">
              Trusted By Leading Companies
            </p>
            <div className="grid md:grid-cols-6 grid-cols-2 items-center gap-1 md:mt-0 mt-4 dark:bg-[#02081766]">
              {trustedCompanies.map((company, i) => (
                <Image
                  key={i}
                  className="mx-4 md:w-28 w-24 h-20 md:h-24"
                  src={company.icon}
                  alt={`${company.name}-icon`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
