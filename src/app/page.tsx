import BackgroundSvg from '@/components/BackgroundSvg';
import HalfCircleGradient from '@/components/HalfCircleGradient';
import HeroSection from '@/components/hero-section';
import { JobLanding } from '@/components/job-landing';
import { JobQuerySchemaType } from '@/lib/validators/jobs.validator';

const HomePage = async ({
  searchParams,
}: {
  searchParams: JobQuerySchemaType;
}) => {
  return (
    <div>
      <BackgroundSvg />
      <HalfCircleGradient position="top" />
      <div className="w-full mt-14">
        <HeroSection />
      </div>
      <div>
        <JobLanding searchParams={searchParams} />
      </div>
      <HalfCircleGradient position="bottom" />
    </div>
  );
};

export default HomePage;
