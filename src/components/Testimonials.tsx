'use client';
import { Tweet } from 'react-tweet';
import { useRef, useState } from 'react';

const tweetStyles = `
  .react-tweet-theme {
    transform: scale(0.9);
    transform-origin: top left;
    max-width: none !important;
    width: 440px !important;  // Reduced from 550px to 440px (20% reduction)
  }
  .react-tweet-theme .react-tweet-media,
  .react-tweet-theme .react-tweet-media-container,
  .react-tweet-theme .react-tweet-embedded {
    display: none !important;
  }
`;

export default function Testimonials() {
  const tweetIds = [
    '1837845866289209697',
    '1834930679877865784',
    '1834096118218801563',
    '1832413072960389558',
    '1829435530913714557',
    '1827998618256544145',
    '1826968639049724010',
  ];

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 396; // Width of one tweet (440 * 0.9)
    const newPosition =
      direction === 'left'
        ? Math.max(scrollPosition - scrollAmount, 0)
        : Math.min(
            scrollPosition + scrollAmount,
            container.scrollWidth - container.clientWidth
          );

    container.scrollTo({ left: newPosition, behavior: 'smooth' });
    setScrollPosition(newPosition);
  };

  return (
    <div
      id="testimonials"
      className="w-full h-fit md:px-16 px-5 flex flex-col items-center py-10 dark:bg-[#020817] bg-[#FFFFFF]"
    >
      <style>{tweetStyles}</style>
      <div className="w-full h-fit flex flex-col items-center">
        <h1 className="font-bold md:text-4xl text-3xl">Testimonials</h1>
        <p className="md:text-sm text-xs py-2 font-semibold text-[#64748B] dark:text-[#94A3B8]">
          Real Success Stories from Job Seekers and Employers
        </p>
      </div>
      <div className="w-full mt-10 relative">
        <div
          className="relative"
          style={{ maxWidth: '1188px', margin: '0 auto' }}
        >
          {' '}
          {/* Reduced from 1485px to 1188px */}
          <div ref={scrollContainerRef} className="overflow-x-hidden w-full">
            <div className="flex gap-6 py-4">
              {tweetIds.map((id) => (
                <div
                  key={id}
                  className="w-[396px] flex-shrink-0 overflow-hidden"
                  data-theme="dark"
                >
                  {' '}
                  {/* Reduced from 495px to 396px */}
                  <Tweet id={id} />
                </div>
              ))}
            </div>
          </div>
          <div className="absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-white dark:from-[#020817] to-transparent pointer-events-none"></div>
          <div className="absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-white dark:from-[#020817] to-transparent pointer-events-none"></div>
        </div>
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md z-10"
          aria-label="Scroll left"
        >
          ←
        </button>
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md z-10"
          aria-label="Scroll right"
        >
          →
        </button>
      </div>
    </div>
  );
}
