'use client';
import { Button } from './ui/button';
import { testimonials } from '@/lib/constant/testimonials.constants';
import TestimonialCard from './TestimonialCard';
export default function Testimonials() {
  return (
    <div
      id="testimonials"
      className="w-full h-fit md:px-16 px-5 flex flex-col items-center py-10"
    >
      <div className="w-full h-fit flex flex-col items-center">
        <h1 className="font-bold md:text-4xl text-3xl">Testimonials</h1>
        <p className="md:text-sm text-xs py-2 font-semibold text-gray-700 dark:text-gray-200">
          Trusted by those who matter.
        </p>
      </div>
      <div className="w-full grid md:grid-cols-3 grid-cols-1 gap-3 items-center mt-10">
        {testimonials.map((testimonial, i) => (
          <TestimonialCard key={i} testimonial={testimonial}/>
        ))}
      </div>
      <div className="bg-white border dark:bg-transparent rounded-xl md:w-5/6 w-full h-fit p-4 flex items-center justify-between my-5">
        <p className="font-semibold md:text-base text-xs">
          Your story matters. Share it with us!
        </p>
        <Button className="md:text-base text-xs">Share your story</Button>
      </div>
    </div>
  );
}
