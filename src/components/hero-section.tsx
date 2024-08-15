import APP_PATHS from '@/config/path.config';
import { GITHUB_REPO } from '@/lib/constant/app.constant';
import Link from 'next/link';
import { Button } from './ui/button';
import Icon from './ui/icon';
import { JobLanding } from './job-landing';

const HeroSection = () => {
  return (
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
            <h1 className="text-5xl max-sm:text-3xl max-sm:leading-tight  font-extrabold leading-[70px]  text-center text-primary">
              Find the Right{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">
                Opportunity
              </span>
              , Hire the Perfect Talent
            </h1>
          </div>
          <div>
            <p className="max-w-2xl text-lg font-light text-foreground">
              India&apos;s most rapidly growing developer community
            </p>
          </div>
        </div>
      </div>
      <div className="text-center">
        <Button asChild className="gap-1 rounded-full">
          <Link href={APP_PATHS.JOBS}>
            Get Started Now
            <Icon icon="rightarrow" size="20" />
          </Link>
        </Button>
      </div>
      <JobLanding />
    </section>
  );
};

export default HeroSection;
