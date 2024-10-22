import { startCronJob } from '@/actions/corn';
import Faqs from '@/components/Faqs';
import HeroSection from '@/components/hero-section';
import { JobLanding } from '@/components/job-landing';
import NotificationRequest from '@/components/Notification';
import Testimonials from '@/components/Testimonials';

const HomePage = async () => {
  startCronJob();
  return (
    <div>
      <NotificationRequest />
      <HeroSection />
      <JobLanding />
      <Testimonials />
      <Faqs />
    </div>
  );
};

export default HomePage;
