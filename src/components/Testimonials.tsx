'use client';
import { testimonials } from '@/lib/constant/testimonials.constants';
import TestimonialCard from './TestimonialCard';
export default function Testimonials() {
  return (
    <div
      id="testimonials"
      className="w-full h-fit md:px-16 px-5 flex flex-col items-center py-10 dark:bg-[#020817] bg-[#FFFFFF]"
    >
      <div className="w-full h-fit flex flex-col items-center">
        <h1 className="font-bold md:text-4xl text-3xl">Testimonials</h1>
        <p className="md:text-sm text-xs py-2 font-semibold text-[#64748B] dark:text-[#94A3B8]">
          Real Success Stories from Job Seekers and Employers
        </p>
      </div>
      <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 items-center mt-10">
        {testimonials.map((testimonial, i) => (
          <TestimonialCard key={i} testimonial={testimonial} />
        ))}
      </div>
    </div>
  );
}
