'use client';
import { testimonialItem } from '@/types/testimonials.types';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { useTheme } from 'next-themes';

interface testimonialCardProps {
  testimonial: testimonialItem;
}

export default function TestimonialCard({ testimonial }: testimonialCardProps) {
  const { theme } = useTheme();
  return (
    <motion.div
      className="md:w-5/6 w-full  h-auto mx-auto my-2 cursor-pointer"
      whileHover={{ y: -5 }}
      transition={{ type: 'tween' }}
    >
      <div
        className="p-[1px] rounded-3xl"
        style={{
          background:
            theme === 'dark'
              ? 'linear-gradient(213.27deg, rgba(78, 122, 255, 0.2) 8.2%, rgba(2, 8, 23, 0.2) 51.13%)'
              : theme === 'light'
                ? 'linear-gradient(213.27deg, rgba(50, 89, 232, 0.2) 8.2%, rgba(255, 255, 255, 0.2) 51.13%)'
                : '',
        }}
      >
        <div className="bg-gradient-to-b dark:from-[#0F172A] dark:to-[#020817] from-[#F1F5F9] to-[#FFFFFF] rounded-3xl p-5 flex flex-col  relative">
          <div className="w-full flex items-center">
            <Quote className="w-7 h-7 absolute top-5 right-5 text-[#94A3B8]" />
            <p className="w-12 h-12 p-2 rounded-full flex items-center justify-center border bg-gray-500 text-white">
              {testimonial.name.charAt(0).toUpperCase()}
            </p>
            <div className="flex flex-col items-start justify-center px-2 mt-2">
              <p className="font-medium text-lg ">{testimonial.name}</p>
              <p className="py-1 text-sm text-[#94A3B8] font-medium">
                Talent Acquisition Lead at Spotify
              </p>
            </div>
          </div>
          <p className="py-2 px-3 font-medium">{testimonial.testimonial}</p>
        </div>
      </div>
    </motion.div>
  );
}
