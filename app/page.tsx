import { auth } from "@/auth";
import Footer from "@/components/Footer";
import GithubBadge from "@/components/GithubBadge";
import { Icons } from "@/components/Icons";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  return (
    <main className="w-full max-h-screen">
      <div className="absolute inset-0 h-full w-full flex flex-col items-center gap-24 p-4 bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
        <SiteHeader />
        <section className="flex flex-col justify-center items-center gap-0">
          <GithubBadge />
          <div className="flex flex-col justify-start items-center gap-4 mt-0">
          <h2 className="text-center text-4xl sm:text-6xl">
            <span className="animate-text-gradient font-bold inline-flex bg-gradient-to-r from-neutral-900 via-slate-500 to-neutral-500 bg-[200%_auto] bg-clip-text leading-tight text-transparent dark:from-neutral-100 dark:via-slate-400 dark:to-neutral-400">
              100xJobs
            </span>
          </h2>
          <div className="text-center">
            <p className="text-lg sm:text-xl lg:text-2xl tracking-tight font-semibold">
              Join the #1 Open Source Job-Platform
            </p>
            <p className="mt-0 text-sm sm:text-md lg:text-xl leading-6 text-gray-600 dark:text-gray-200">
              India&apos;s most rapidly growing developer community
            </p>
          </div>
          <div className="mt-10 flex gap-4">
            <a
              href="https://github.com/Harit007x/job-board"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center"
            >
              <Button>
                Go to GitHub <Icons.arrowRight className="pl-0.5" size={16} />
              </Button>{' '}
            </a>
            <Button variant="secondary">
              Contact Us
            </Button>
          </div>
          </div>
        </section>
        <Footer />
      </div>
    </main>
  );
};

export default HomePage;
