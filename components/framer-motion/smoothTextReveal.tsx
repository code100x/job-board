'use client';

import React, { useEffect } from 'react';
import { motion, useAnimation, Transition, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';
import { boolean } from 'zod';

interface SmoothTextRevealProps {
  text: string;
  className?: string;
  direction?: 'left' | 'right';
  animation?: 'fadeIn' | 'fadeOut' | 'easeIn' | 'easeOut';
  gradient?: boolean
}

export function SmoothTextReveal({ text, className, direction = 'left', animation = 'fadeIn', gradient = false }: SmoothTextRevealProps) {
  const controls = useAnimation();
  const words = text.split(' ');

  useEffect(() => {
    const variants: Variants = {
      fadeIn: { opacity: 1 },
      fadeOut: { opacity: 0 },
      easeIn: { opacity: 1, x: 0, transition: { ease: 'easeIn', duration: 0.2 } },
      easeOut: { opacity: 1, x: 0, transition: { ease: 'easeOut', duration: 0.2 } }
    };

    controls.start((i) => ({
      ...variants[animation as keyof Variants], // Type assertion for TypeScript
      transition: { delay: i * 0.1 }
    }));
  }, [controls, animation]);

  return (
    <div className={`text-lg flex flex-wrap justify-center`}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          custom={direction === 'left' ? index : words.length - index}
          initial={{ opacity: 0}}
          animate={controls}
          className={cn(`mr-1 ${className}`,{
            "bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 via-slate-500 to-neutral-400 dark:from-neutral-100 dark:via-neutral-500 dark:to-neutral-700": gradient
          })}
        >
{/* "animate-text-gradient font-bold inline-flex bg-gradient-to-r from-neutral-900 via-slate-500 to-neutral-500 bg-[200%_auto] bg-clip-text leading-tight text-transparent dark:from-neutral-100 dark:via-slate-600 dark:to-neutral-400"> */}

          {word}
        </motion.span>
      ))}
    </div>
  );
}
