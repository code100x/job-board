import React from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { Poppins } from "next/font/google";

const fontPoppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "400", "700"],
});

const NotFoundPage = () => {
  return (
    <>
      <SiteHeader />
      <div
        className={`min-h-screen flex flex-col justify-center px-6 py-12 lg:px-8 bg-white dark:bg-black ${fontPoppins.className}`}
      >
        <div className="max-w-2xl mx-auto">
          <p className="text-indigo-600 dark:text-indigo-400 text-xl mb-2">
            404
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl mb-4">
            Page not found
          </h1>
          <p className="text-base text-gray-600 dark:text-gray-300 mb-8">
            The page you're trying to reach doesn't exist or is no longer
            available.
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-black dark:bg-white dark:text-black rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200"
          >
            Go to homepage
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
