'use client';
import { faqData } from '@/lib/constant/faqs.constants';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Faqs() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  return (
    <div
      id="faq"
      className="w-full h-fit dark:bg-faq-dark md:px-16 px-5 flex flex-col items-center pt-10"
    >
      <div className="w-full h-fit flex flex-col items-center">
        <h2 className="font-bold md:text-4xl text-3xl text-center">
          Frequently Asked Questions
        </h2>
        <p className="md:text-sm text-xs py-2 font-semibold text-[#64748B] dark:text-[#94A3B8]">
          Quick answers to any questions you may have.
        </p>
      </div>

      <div className="w-full h-fit py-10 flex justify-center items-center">
        <div className="md:w-3/6 w-full flex flex-col items-center bg-white dark:bg-transparent flex-grow lg:flex-grow-0">
          {faqData.map((faq, i) => (
            <div
              key={i}
              className={`w-full flex flex-col items-start md:p-4 p-2`}
            >
              <button
                className="flex w-full justify-between items-center cursor-pointer focus:outline-none dark:bg-[#0F172A] bg-[#F1F5F9] p-4 rounded-xl"
                onClick={() => toggleExpand(i)}
                aria-expanded={expandedIndex === i}
                aria-label="toggle-expand"
              >
                <p className="text-left font-medium dark:text-white text-gray-900">
                  {faq.question}
                </p>
                <motion.div
                  animate={{ rotate: expandedIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-6 h-6 dark:text-white text-gray-900" />
                </motion.div>
              </button>
              <AnimatePresence initial={false}>
                {expandedIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden w-full"
                  >
                    <p className="md:text-base text-sm mt-3 dark:text-[#F8FAFC] text-gray-900 leading-7 dark:bg-[#0F172A] bg-[#64748B1A] rounded-xl p-3">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
