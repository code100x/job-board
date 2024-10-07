'use client';
import React from 'react';
import { InfiniteMovingCards } from './ui/infinite-moving-cards';

const tweetIds = [
  '1837845866289209697',
  '1834930679877865784',
  '1834096118218801563',
  '1832413072960389558',
  '1829435530913714557',
  '1827998618256544145',
  '1826968639049724010',
];

export default function Testimonials() {
  return (
    <div className="flex justify-center items-center min-h-fit max-w-[90vw] sm:max-w-[100vw]  overflow-hidden flex-col">
      <div className="w-full h-fit flex flex-col items-center">
        <h2 className="font-bold text-2xl md:text-4xl">Testimonials</h2>
        <p className="text-sm md:text-base py-2 font-semibold text-[#64748B] dark:text-[#94A3B8]">
          Real Success Stories from Job Seekers and Employers
        </p>
      </div>
      <InfiniteMovingCards items={tweetIds} direction="right" speed="slow" />
    </div>
  );
}
