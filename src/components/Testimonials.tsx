'use client';
import { Tweet } from 'react-tweet';
import { useRef, useState, useEffect } from 'react';

const tweetStyles = `
  .react-tweet-theme {
    transform: scale(0.9);

    transform-origin: top left;
    max-width: none !important;

    width: 440px !important;  

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

  const scrollAmount = 2;

  const scroll = () => {
    const container = scrollContainerRef.current;

    if (!container) return;

    const maxScrollPosition = container.scrollWidth - container.clientWidth;

    const newPosition = scrollPosition + scrollAmount;

    if (newPosition > maxScrollPosition) {
      container.scrollTo({ left: 0, behavior: 'smooth' });

      setScrollPosition(0);
    } else {
      container.scrollTo({ left: newPosition, behavior: 'smooth' });

      setScrollPosition(newPosition);
    }
  };

  // Constant auto-scroll functionality

  useEffect(() => {
    const interval = setInterval(scroll, 30);
    return () => clearInterval(interval);
  }, [scrollPosition]);

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
          <div ref={scrollContainerRef} className="overflow-x-hidden w-full">
            <div className="flex gap-6 py-4">
              {tweetIds.map((id) => (
                <div
                  key={id}
                  className="w-[396px] flex-shrink-0 overflow-hidden"
                  data-theme="dark"
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
