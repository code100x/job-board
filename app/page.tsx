import BlurFade from "@/components/framer-motion/BlurFade";
import GithubBadge from "@/components/GithubBadge";
import { Icons } from "@/components/Icons";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { Spotlight } from "@/components/ui/Spotlight";
import Link from "next/link";

const HomePage = () => {
  return (
    <main className="rerlative w-full max-h-screen">
      <Spotlight
        className="-top-30 left-0 md:left-32 lg:left-40 md:-top-20 opacity-10 hidden dark:block"
        fill="white"
      />
      <div className="w-full flex flex-col items-center gap-24 p-4 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] h-screen">
        <SiteHeader />
        <section className="flex flex-col justify-center items-center gap-0 mt-32 ">
          <BlurFade delay={0.4} inView={true}>
            <GithubBadge />
          </BlurFade>
          <div className="flex flex-col justify-start items-center gap-4 mt-0">
            <h3 className="text-center text-4xl sm:text-6xl">
              <BlurFade delay={0.45} inView={true}>
                <p className="text-4xl sm:text-6xl font-bold">100xJobs</p>
              </BlurFade>
            </h3>
            <div className="text-center text-foreground dark:text-foreground space-y-3">
              <BlurFade delay={0.5} inView={true}>
                <p className="text-lg sm:text-xl lg:text-4xl tracking-tight font-semibold">
                  Join the #1 Open Source Job-Platform
                </p>
              </BlurFade>
              <BlurFade delay={0.54} inView={true}>
                <p className="mt-0 text-sm sm:text-md lg:text-md leading-6 text-gray-600 dark:text-gray-200">
                  India&apos;s most rapidly growing developer community
                </p>
              </BlurFade>
            </div>
            <div className="flex gap-4">
              <BlurFade
                className="flex justify-center items-center gap-4"
                delay={0.58}
              >
                <Link
                  href="https://github.com/code100x"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center"
                >
                  <Button>
                    Go to GitHub{" "}
                    <Icons.arrowRight className="pl-0.5" size={16} />
                  </Button>
                </Link>
                <Button variant="secondary">Contact Us</Button>
              </BlurFade>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default HomePage;
