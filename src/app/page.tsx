import Faqs from '@/components/Faqs';
import HeroSection from '@/components/hero-section';
import { JobLanding } from '@/components/job-landing';
import Testimonials from '@/components/Testimonials';

const HomePage = async () => {
  return (
    <div>
      <HeroSection />
      <JobLanding />
      <Testimonials />
      <Faqs />
    </div>
  );
};

export default HomePage;
