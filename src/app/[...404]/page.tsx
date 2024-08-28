import React from 'react';
import Link from 'next/link';
import { Poppins } from 'next/font/google';

//applying font from google
const fontOptions = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['400', '700'],
});

const Custom404Page = () => {
  return (
    <>
      <div
        className={`min-h-screen flex flex-col justify-center items-center px-2 py-2 lg:px-2 bg-white dark:bg-black ${fontOptions.className}`}
      >
        <h1 className="text-3xl font-bold tracking-tight text-center text-gray-900 dark:text-white sm:text-7xl mb-4">
          Oops!
        </h1>
        <p className="text-red-800 dark:text-orange-400 font-bold text-4x mb-2 text-center">
          We couldn’t find the page you’re looking for. <br />
          404 - PAGE NOT FOUND
        </p>
        <p className="text-base text-gray-600 dark:text-gray-00 mb-8 text-center">
          The page you are looking for was moved, removed, renamed, or might
          never have existed.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-black dark:bg-white dark:text-black rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200"
        >
          Visit the homepage
        </Link>
      </div>
    </>
  );
};

export default Custom404Page;
