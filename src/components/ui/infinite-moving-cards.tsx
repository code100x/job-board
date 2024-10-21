'use client';

import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react';
import { Tweet } from 'react-tweet';

export const InfiniteMovingCards = ({
  items,
  direction = 'left',
  speed = 'fast',
  pauseOnHover = true,
  className,
}: {
  items: string[];
  direction?: 'left' | 'right';
  speed?: 'fast' | 'normal' | 'slow';
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  const [isDown, setIsDown] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0.0);
  const [scrollLeft, setscrollLeft] = useState<number>(0.0);
  const [totalWidth, setTotalWidth] = useState<number>(0.0);

  useEffect(() => {
    const slider = containerRef.current;
    const handleMouseDown = (event: MouseEvent) => {
      if (!slider) return;
      setIsDown(true);
      setStartX(event.pageX - slider.offsetLeft);
      setscrollLeft(slider.scrollLeft);
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (slider && isDown) {
        const x = event.pageX - slider.offsetLeft;
        const walk = x - startX;
        const newScrollLeft = scrollLeft - walk;

        const maxScrollLeft = totalWidth - slider.clientWidth;

        if (newScrollLeft < 0) slider.scrollLeft = 0;
        else if (newScrollLeft > maxScrollLeft)
          slider.scrollLeft = maxScrollLeft;
        else slider.scrollLeft = newScrollLeft;
      }
    };

    const handleMouseLeave = () => {
      setIsDown(false);
    };

    const handleMouseUp = () => {
      setIsDown(false);
    };

    if (slider) {
      slider.addEventListener('mousedown', handleMouseDown);
      slider.addEventListener('mousemove', handleMouseMove);
      slider.addEventListener('mouseleave', handleMouseLeave);
      slider.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      if (slider) {
        slider.removeEventListener('mousedown', handleMouseDown);
        slider.removeEventListener('mousemove', handleMouseMove);
        slider.removeEventListener('mouseleave', handleMouseLeave);
        slider.removeEventListener('mouseup', handleMouseMove);
      }
    };
  }, [isDown, startX, scrollLeft]);

  useEffect(() => {
    addAnimation();
    const scroller = scrollerRef.current;
    if (scroller) {
      const listItems = scroller.querySelectorAll('li');
      let width = 0,
        length = 0;
      listItems.forEach((item) => {
        if (length < listItems.length / 2)
          width +=
            (item as HTMLElement).offsetWidth +
            parseFloat(getComputedStyle(item).marginRight);
        length++;
      });
      setTotalWidth(width);
    }
  }, []);

  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === 'left') {
        containerRef.current.style.setProperty(
          '--animation-direction',
          'forwards'
        );
      } else {
        containerRef.current.style.setProperty(
          '--animation-direction',
          'reverse'
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === 'fast') {
        containerRef.current.style.setProperty('--animation-duration', '20s');
      } else if (speed === 'normal') {
        containerRef.current.style.setProperty('--animation-duration', '40s');
      } else {
        containerRef.current.style.setProperty('--animation-duration', '80s');
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn(
        'scroller relative z-20  max-w-7xl overflow-hidden  [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]',
        className
      )}
      style={{
        userSelect: 'none',
      }}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          ' flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap',
          start && 'animate-scroll ',
          pauseOnHover && 'hover:[animation-play-state:paused]'
        )}
      >
        {items.map((id, index) => (
          <li
            className="w-[350px] min-h-fit max-w-full relative rounded-2xl   flex-shrink-0  px-8 py-6 md:w-[450px]"
            // style={{
            //   background:
            //     'linear-gradient(180deg, var(--slate-800), var(--slate-900)',
            // }}
            key={index}
          >
            <Tweet id={id} />
          </li>
        ))}
      </ul>
    </div>
  );
};
