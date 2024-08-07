import { auth } from "@/auth";
import FeatureCardsContainer from "@/components/FeatureCardsContainer";
import Footer from "@/components/Footer";
import GettingStartedcard from "@/components/GettingStartedcard";
import GithubBadge from "@/components/GithubBadge";
import { SiteHeader } from "@/components/SiteHeader";
import TrustedCompanies from "@/components/TrustedCompanies";

const HomePage = () => {
  return (
    <main className="w-full max-h-screen">
      <div className="absolute inset-0 h-full w-full flex flex-col items-center gap-24 p-4 bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
        <SiteHeader />
        <section className="flex flex-col justify-start items-center gap-8">
          <GithubBadge />
          <div className="flex flex-col justify-start items-center gap-7 mt-10">
            <p className="text-2xl sm:text-3xl lg:text-4xl tracking-tight font-semibold text-slate-700">
              Join the #1 Open Source Job-Platform
            </p>
            <h1 className="text-6xl sm:text-7xl lg:text-8xl text-center tracking-tighter bg-gradient-to-r from-indigo-600 via-violet-500 to-blue-700 bg-clip-text text-transparent font-black">
              100xJobs
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-center text-slate-700/90 font-bold tracking-loose">
              India&apos;s most rapidly growing developer community
            </p>
          </div>
        </section>
        <FeatureCardsContainer/>
        <TrustedCompanies/>
        <GettingStartedcard/>
        <Footer />
      </div>
    </main>
  );
};

export default HomePage;
