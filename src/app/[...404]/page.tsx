'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Poppins } from 'next/font/google';
import { Button } from '@/components/ui/button';
import { Moon, Star, Rocket } from 'lucide-react';

// applying font from Google
const fontOptions = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['400', '700'],
});

const Custom404Page = () => {
  const [isReturning, setIsReturning] = useState(false);

  return (
    <div
      className={`${fontOptions.variable} min-h-screen bg-gradient-to-b from-indigo-900 to-purple-900 flex flex-col items-center justify-center p-4 overflow-hidden`}
    >
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(40)].map((_, i) => (
          <Star
            key={i}
            className="absolute text-white animate-twinkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>
      <Moon className="text-gray-300 w-16 h-16 mb-8 animate-pulse" />
      <h1 className="text-6xl font-bold text-white mb-4">404</h1>
      <p className="text-2xl text-gray-300 mb-8 text-center">
        Oops! You have drifted into uncharted space.
        <br />
        The page you are looking for was moved, removed, renamed, or might never
        have existed.
      </p>
      <div
        className={`relative mb-8 transition-transform duration-1000 ${isReturning ? 'translate-y-[500px]' : ''}`}
      >
        <div className="w-32 h-32 bg-gray-200 rounded-full relative overflow-hidden">
          <div className="absolute inset-2 bg-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-blue-500 rounded-full"></div>
        </div>
      </div>

      <Link href="/">
        <Button
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105"
          onClick={() => setIsReturning(true)}
        >
          <Rocket className="mr-2 h-4 w-4" /> Return to Earth
        </Button>
      </Link>
    </div>
  );
};

export default Custom404Page;
