'use client';

import React, { useEffect } from 'react';
import { motion, useAnimation, Transition, Variants } from 'framer-motion';

interface SmoothTextRevealProps {
  text: string;
  className?: string;
  direction?: 'left' | 'right';
  animation?: 'fadeIn' | 'fadeOut' | 'easeIn' | 'easeOut';
}

export function SmoothTextReveal({ text, className, direction = 'left', animation = 'fadeIn' }: SmoothTextRevealProps) {
  const controls = useAnimation();
  const words = text.split(' ');

  useEffect(() => {
    const variants: Variants = {
      fadeIn: { opacity: 1 },
      fadeOut: { opacity: 0 },
      easeIn: { opacity: 1, x: 0, transition: { ease: 'easeIn', duration: 0.5 } },
      easeOut: { opacity: 1, x: 0, transition: { ease: 'easeOut', duration: 0.5 } }
    };

    controls.start((i) => ({
      ...variants[animation as keyof Variants], // Type assertion for TypeScript
      transition: { delay: i * 0.2 }
    }));
  }, [controls, animation]);

  return (
    <div className={`text-lg flex flex-wrap justify-center ${className}`}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          custom={direction === 'left' ? index : words.length - index}
          initial={{ opacity: 0 }}
          animate={controls}
          className="mr-1"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}
