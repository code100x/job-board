'use client';
import { faqData } from '@/lib/constant/faqs.constants';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FaqsGetintouchCard from './FaqsGetintouchCard';

export default function Faqs() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  return (
    <div
      id="faq"
      className="w-full h-fit md:px-16 px-5 flex flex-col items-center pt-10"
    >
      <div className="w-full h-fit flex flex-col items-center">
        <h1 className="font-bold md:text-4xl text-3xl">FAQs</h1>
        <p className="md:text-sm text-xs py-2 font-semibold text-gray-700 dark:text-gray-200">
          Quick answers to any questions you may have.
        </p>
      </div>

      <div className="w-full h-fit py-10 flex justify-center items-center">
        <div className="md:w-4/6 w-full flex flex-col items-center border rounded-xl bg-white dark:bg-transparent">
          {faqData.map((faq, i) => (
            <div
              key={i}
              className={`w-full flex flex-col items-start md:p-6 p-4 cursor-pointer ${
                i !== faqData.length - 1 && 'border-b'
              }`}
              onClick={() => toggleExpand(i)}
              aria-expanded={expandedIndex === i}
            >
              <div className="flex w-full justify-between items-center">
                <p className="text-left font-medium dark:text-white text-gray-900">
                  {faq.question}
                </p>
                <motion.div
                  animate={{ rotate: expandedIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-6 h-6 dark:text-white text-gray-900" />
                </motion.div>
              </div>
              <AnimatePresence initial={false}>
                {expandedIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden w-full"
                  >
                    <p className="md:text-base text-sm mt-3 dark:text-white text-gray-900 leading-7">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
      <FaqsGetintouchCard />
    </div>
  );
}
