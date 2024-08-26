'use client';

import { InfiniteMovingCards } from './ui/infinite-moving-cards';

export function Companies() {
  return (
    <div className="h-[20rem] rounded-md flex flex-col antialiased dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </div>
  );
}

const testimonials = [
  {
    id: '1',
    image: '/companies/microsoft.png',
  },
  {
    id: '2',
    image: '/companies/facebook.png',
  },
  {
    id: '3',
    image: '/companies/twitch.png',
  },
  {
    id: '4',
    image: '/companies/tinder.png',
  },
];
