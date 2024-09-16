'use client';
import React from 'react';
import Link from 'next/link';
import { Poppins } from 'next/font/google';
import { Home, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

// Applying font from Google
const fontOptions = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['400', '700'],
});

const Custom404Page = () => {
  return (
    <div
      className={`min-h-screen flex flex-col justify-center items-center px-4 py-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 ${fontOptions.className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 5 }}
        >
          <AlertTriangle className="w-24 h-24 text-yellow-500 mb-6 mx-auto" />
        </motion.div>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl mb-4">
          404 - Page Not Found
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
          We are sorry, but we could not find the page you are looking for.
        </p>
        <p className="text-base text-gray-500 dark:text-gray-400 mb-8 max-w-lg mx-auto">
          The page may have been moved, removed, renamed, or might never have
          existed.
        </p>
        <Button
          asChild
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full transition-colors duration-300"
        >
          <Link href="/">
            <span className="flex items-center">
              <Home className="mr-2 h-5 w-5" />
              Return to Homepage
            </span>
          </Link>
        </Button>
      </motion.div>
    </div>
  );
};

export default Custom404Page;
