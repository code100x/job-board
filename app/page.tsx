import { auth } from "@/auth";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const HomePage = async () => {
  const session = await auth();

  return (
    <main className="w-full max-h-screen">
      <div className="absolute inset-0 h-full w-full flex flex-col items-center gap-24 p-4 bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
        <Navbar session={session} />
        <section className="flex flex-col justify-start gap-4">
          <p className="lg:text-4xl tracking-tight font-semibold text-slate-700">
            Join the #1 Open Source Job-Platform
          </p>
          <h1 className="lg:text-8xl text-center tracking-tighter bg-gradient-to-r from-indigo-600 via-violet-500 to-blue-700 bg-clip-text text-transparent font-black">
            100xJobs
          </h1>
          <p className="lg:text-xl text-center text-slate-700/90 font-bold tracking-loose">
            India&apos;s most rapidly growing developer community
          </p>
        </section>
        <Footer />
      </div>
    </main>
  );
};

export default HomePage;
