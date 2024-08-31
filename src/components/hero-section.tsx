import { GITHUB_REPO } from '@/lib/constant/app.constant';
import Link from 'next/link';
import Icon from './ui/icon';
import { MarqueeDemo } from './infinitescroll';

const HeroSection = () => {
  return (
    <>
      <section className="relative max-sm:pt-10 container">
        <div className="flex flex-col gap-4 items-center justify-center py-8 md:py-12 md:pb-8 lg:py-12 lg:pb-10">
          <Link
            href={GITHUB_REPO}
            target="_blank"
            className="flex border border-neutral-200 dark:border-neutral-600 bg-gradient-to-b from-transparent dark:via-white/5 to-purple-400 backdrop-blur-md py-2 gap-2 items-center px-4 rounded-full"
          >
            <Icon icon="sparcle" className="text-yellow-500" size="18" />
            <p className=" text-primary-text text-sm">Star us on Github</p>
          </Link>
          <div className="flex items-center flex-col gap-3 max-w-[950px]">
            <div>
              <h1 className="text-6xl max-sm:text-3xl max-sm:leading-tight  font-extrabold leading-[70px]  text-center text-primary">
                {/* Find the Right{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">
                  Opportunity
                </span>
                , Hire the Perfect Talent */}
                Find Your Perfect Job Today!
              </h1>
            </div>
            <div>
              <p className="max-w-2xl text-sm md:text-lg font-light text-foreground text-center">
                Discover a thoughtfully selected collection of job opportunities
                chosen by our dedicated team of experts.
              </p>
            </div>
          </div>
        </div>
        <MarqueeDemo />
      </section>
    </>
  );
};

export default HeroSection;
