'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Tweet } from 'react-tweet';

const tweetIds = [
  '1837845866289209697',
  '1834930679877865784',
  '1834096118218801563',
  '1832413072960389558',
  '1829435530913714557',
  '1827998618256544145',
  '1826968639049724010',
];

const tweetStyles = `
  .react-tweet-theme {
    transform: scale(0.9);
    transform-origin: top left;
    max-width: none !important;
    width: 100% !important;
  }
  .react-tweet-theme .react-tweet-media,
  .react-tweet-theme .react-tweet-media-container,
  .react-tweet-theme .react-tweet-embedded {
    display: none !important;
  }
`;

const scrollContainerStyles = `
  .scroll-container::-webkit-scrollbar {
    display: none;
  }
  .scroll-container {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

export default function Testimonials() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollAmount = 2;
  const [isHovered, setIsHovered] = useState(false);

  const scroll = () => {
    if (isHovered) return;
    const container = scrollContainerRef.current;
    if (!container) return;
    const newPosition = scrollPosition + scrollAmount;
    const maxScrollPosition = container.scrollWidth / 3;
    if (newPosition >= maxScrollPosition) {
      container.scrollLeft = newPosition - maxScrollPosition;
      setScrollPosition(newPosition - maxScrollPosition);
    } else {
      container.scrollLeft = newPosition;
      setScrollPosition(newPosition);
    }
  };

  useEffect(() => {
    const interval = setInterval(scroll, 30);
    return () => clearInterval(interval);
  }, [scrollPosition, isHovered]);

  const tripleIds = [...tweetIds, ...tweetIds, ...tweetIds];

  return (
    <div
      id="testimonials"
      className="w-full h-fit px-4 md:px-8 flex flex-col items-center py-10 dark:bg-[#020817] bg-[#FFFFFF]"
    >
      <style>{tweetStyles}</style>
      <style>{scrollContainerStyles}</style>
      <div className="w-full h-fit flex flex-col items-center">
        <h1 className="font-bold text-2xl md:text-4xl">Testimonials</h1>
        <p className="text-sm md:text-base py-2 font-semibold text-[#64748B] dark:text-[#94A3B8]">
          Real Success Stories from Job Seekers and Employers
        </p>
      </div>
      <div className="w-full mt-2 relative">
        <div className="relative mx-auto" style={{ maxWidth: '1200px' }}>
          <div
            ref={scrollContainerRef}
            className="overflow-x-hidden w-full scroll-container"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="flex gap-4 py-4" style={{ width: '300%' }}>
              {tripleIds.map((id, index) => (
                <div
                  key={`${id}-${index}`}
                  className="flex-shrink-0 w-full md:w-[396px]"
                  data-theme="dark"
                  style={{ height: '550px' }}
                >
                  <Tweet id={id} />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
