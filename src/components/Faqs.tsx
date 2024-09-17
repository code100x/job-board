'use client';
import { faqData } from '@/lib/constant/faqs.constants';
import { ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import FaqsGetintouchCard from './FaqsGetintouchCard';

export default function Faqs() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const expandRef = useRef<(HTMLDivElement | null)[]>([]);

  const toggleExpand = (index: number | null) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      expandedIndex !== null &&
      expandRef.current[expandedIndex] &&
      !expandRef.current[expandedIndex].contains(event.target as Node)
    ) {
      setExpandedIndex(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [expandedIndex]);

  return (
    <div
      id="faq"
      className="w-full h-fit md:px-16 px-5 flex flex-col items-center pt-10"
    >
      <div className="w-full h-fit flex flex-col items-center">
        <h1 className="font-bold md:text-4xl text-3xl">FAQs</h1>
        <p className="md:text-sm text-xs py-2 font-semibold light:text-gray-700 dark:text-gray-200">
          Quick answers to any questions you may have.{' '}
        </p>
      </div>

      <div className="w-full h-fit py-10 flex justify-center items-center">
        <div className="text-white md:w-4/6 w-full flex flex-col items-center border rounded-xl bg-white dark:bg-transparent">
          {faqData.map((faq, i) => (
            <div
              key={i}
              ref={(el) => {
                expandRef.current[i] = el;
              }}
              className={`w-full flex h-fit flex-col items-start md:p-6 p-4 ${i !== faqData.length - 1 && 'border-b'}`}
            >
              <div
                className="flex w-full h-full justify-between items-center cursor-pointer"
                onClick={() => toggleExpand(i)}
              >
                <div className="w-full flex h-full items-center justify-between">
                  <p className="md:px-5 px-2 md:text-xl text-lg dark:text-white text-[#0e0e0e] font-medium">
                    {faq.question}
                  </p>
                  <button className="p-3">
                    <ChevronDown
                      className={`w-6 h-6 dark:text-white text-[#0e0e0e] transition-all duration-300 ease-in-out ${expandedIndex === i && 'rotate-180'}`}
                    />
                  </button>
                </div>
              </div>

              <p
                className={`${
                  expandedIndex === i
                    ? 'opacity-100 md:text-base text-sm translate-y-0 transition-all duration-500 ease-in-out mt-3 md:pl-10 pl-4 dark:text-white text-[#0e0e0e] leading-7'
                    : 'opacity-0 translate-y-[-20px] max-h-0 leading-7  md:text-base text-sm md:pl-10 pl-4'
                }`}
              >
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
      <FaqsGetintouchCard />
    </div>
  );
}
