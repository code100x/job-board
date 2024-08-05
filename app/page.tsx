import { auth } from "@/auth";
import Footer from "@/components/Footer";
import GithubBadge from "@/components/GithubBadge";
import Navbar from "@/components/Navbar";

const HomePage = async () => {
  const session = await auth();

  return (
    <main className="w-full min-h-screen bg-cover bg-center">
      <div className="absolute inset-0 h-full w-full flex flex-col items-center gap-12 p-4 bg-white bg-opacity-70">
        <Navbar session={session} />
        <section className="flex flex-col justify-start items-center gap-8 text-center p-4">
          <GithubBadge />
          <div className="flex flex-col justify-start items-center gap-4">
            <p className="text-2xl sm:text-3xl md:text-4xl tracking-tight font-semibold text-slate-700">
              Join the #1 Open Source Job-Platform
            </p>
            <h1 className="text-5xl sm:text-7xl md:text-8xl tracking-tighter bg-gradient-to-r from-indigo-600 via-violet-500 to-blue-700 bg-clip-text text-transparent font-black">
              100xJobs
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-slate-700/90 font-bold tracking-loose">
              India&apos;s most rapidly growing developer community
            </p>
          </div>
        </section>
        <Footer />
      </div>
    </main>
  );
};

export default HomePage;
