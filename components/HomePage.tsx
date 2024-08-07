"use client";
import GithubBadge from "@/components/GithubBadge";
import { motion } from "framer-motion";
import JobCarousel from "./JobCarousel";
 

const HomePageContent = () => {
  return (
    <main className="w-full min-h-screen overflow-hidden relative">
        
      <div className="pt-16  absolute inset-0 h-full w-full flex flex-col items-center gap-24 p-4 bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
        
        <section className="flex flex-col items-center gap-4 sm:gap-8">
          <motion.section
            className="flex flex-col items-center gap-4 sm:gap-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <GithubBadge />
            <div className="flex flex-col items-center gap-2 sm:gap-4 text-center">
              <motion.p
                className="text-xl sm:lg:text-4xl tracking-tight font-semibold text-slate-700"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Join the #1 Open Source Job-Platform
              </motion.p>
              <motion.h1
                className="text-7xl sm:lg:text-8xl tracking-tighter bg-gradient-to-r from-indigo-600 via-violet-500 to-blue-700 bg-clip-text text-transparent font-black"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                100xJobs
              </motion.h1>
              <motion.p
                className="text-lg sm:lg:text-xl text-slate-700/90 font-bold tracking-loose"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                India&apos;s most rapidly growing developer community
              </motion.p>
              <JobCarousel/>
            </div>

            
          </motion.section>
         <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-purple-500/10 to-pink-500/10 mix-blend-multiply"></div>
        </div>
        </section>
      </div>
    </main>
  );
};

export default HomePageContent;
