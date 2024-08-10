"use client";
import { motion } from "framer-motion";
import { Icons } from "./Icons";

const GithubBadge = () => {
  return (
    <div className="mb-6 flex">
      <motion.a
        href="https://github.com/Harit007x/job-board"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex"
        initial={{ clipPath: "inset(0 50% 0 50%)" }}
        animate={{ clipPath: "inset(0 0% 0 0%)" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <span className="relative inline-block overflow-hidden rounded-full p-[1px]">
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#a9a9a9_0%,#0c0c0c_50%,#a9a9a9_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#171717_0%,#737373_50%,#171717_100%)]" />
          <div className="inline-flex h-full w-full cursor-pointer justify-center rounded-full bg-white px-3 py-1 text-xs font-medium leading-5 text-slate-600 backdrop-blur-xl dark:bg-black dark:text-slate-200">
            ✨ Star us on Github
            <span className="inline-flex items-center pl-2 text-black dark:text-white">
              <Icons.arrowRight
                className="pl-0.5 text-black dark:text-white"
                size={16}
              />
            </span>
          </div>
        </span>
      </motion.a>
    </div>
  );
};

export default GithubBadge;
