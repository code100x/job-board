import { auth } from "@/auth";
import Footer from "@/components/Footer";
import GithuBadge from "@/components/GithubBadge";
import Navbar from "@/components/Navbar";
import { RecoilRoot } from "recoil";

const HomePage = async () => {
  const session = await auth();

  return (
    <main className="w-full">
      <div className="absolute inset-0 h-full w-full flex flex-col items-center gap-24 p-4 bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
      <Navbar session={session} />
        <section className="flex flex-col justify-start gap-8 lg:mt-20 xl:mt-24 ">
          <GithuBadge />
          <div className="flex flex-col justify-start gap-4">
            <p className="lg:text-4xl tracking-tight font-semibold text-slate-700">
              Join the #1 Open Source Job-Platform
            </p>
            <h1 className="lg:text-8xl text-center tracking-tighter bg-gradient-to-r from-indigo-600 via-violet-500 to-blue-700 bg-clip-text text-transparent font-black">
              100xJobs
            </h1>
            <p className="lg:text-xl text-center text-slate-700/90 font-bold tracking-loose">
              India&apos;s most rapidly growing developer community
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default HomePage;
