import BackgroundSvg from '@/components/BackgroundSvg';
import HeroSection from '@/components/hero-section';

const HomePage = async () => {
  return (
    <>
      <BackgroundSvg />
      <div className="w-full">
        <HeroSection />
      </div>
    </>
  );
};

export default HomePage;
