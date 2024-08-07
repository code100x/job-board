import { auth } from "@/auth";
import GithubBadge from "@/components/GithubBadge";
import { SiteHeader } from "@/components/SiteHeader";

const HomePage = () => {
  return (
    <main className="w-full">
      <div className="inset-0 h-full w-full flex flex-col items-center gap-24 p-4 bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
        <SiteHeader />
        <section className="flex flex-col justify-start items-center gap-8 mb-20">
          <GithubBadge />
          <div className="flex flex-col justify-start items-center gap-7 mt-10">
            <p className="text-2xl sm:text-3xl lg:text-4xl text-center tracking-tight font-semibold text-slate-700">
              Join the #1 Open Source Job-Platform
            </p>
            <h1 className="w-full text-6xl sm:text-7xl lg:text-8xl text-center tracking-tighter bg-gradient-to-r from-indigo-600 via-violet-500 to-blue-700 bg-clip-text text-transparent font-black">
              100xJobs
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-center text-slate-700/90 font-bold tracking-loose">
              India&apos;s most rapidly growing developer community
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default HomePage;
