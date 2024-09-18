'use client';
import { testimonialItem } from '@/types/testimonials.types';
import { motion } from 'framer-motion';

interface testimonialCardProps {
  testimonial: testimonialItem;
}

export default function TestimonialCard({
  testimonial,
}: testimonialCardProps) {
  return (
    <motion.div
      className="md:w-5/6 w-full h-fit p-5 flex flex-col mx-auto border rounded-3xl dark:bg-[#0b0b0b] rounded-bl-none my-2 cursor-pointer shadow-sm"
      whileHover={{ y: -5 }}
      transition={{ type: 'tween' }}
    >
      <div className="w-full flex items-center">
        <p className="w-10 h-10 p-2 rounded-full flex items-center justify-center border">
          {testimonial.name.charAt(0).toUpperCase()}
        </p>
        <p className="px-2">{testimonial.name}</p>
      </div>
      <p className="py-2">&quot;{testimonial.testimonial}&quot;</p>
    </motion.div>
  );
}
