import Faqs from '@/components/Faqs';
import HeroSection from '@/components/hero-section';
import { JobLanding } from '@/components/job-landing';
import Testimonials from '@/components/Testimonials';
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const HomePage = async () => {
  const session = await getServerSession(authOptions);
  {
    session &&
      session.user.role === 'USER' &&
      !session.user.onBoard &&
      redirect('/create-profile');
  }
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
