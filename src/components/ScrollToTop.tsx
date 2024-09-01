'use client';
import { Button } from './ui/button';
import { MoveUp } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  function toUp() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
  return (
    <Button
      className={`fixed bottom-5 right-5 w-[50px] h-[50px] rounded-full bg-white text-black flex items-center justify-center shadow-lg hover:bg-gray-200 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      aria-label="Scroll to top"
      onClick={toUp}
    >
      <MoveUp className="text-black" />
    </Button>
  );
}
