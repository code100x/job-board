import Faqs from '@/components/Faqs';
import FaqsGetintouchCard from '@/components/FaqsGetintouchCard';

export default function Page() {
  return (
    <main className="w-full h-fit md:px-16 px-5 flex flex-col items-center mt-20">
      <div className="w-full h-fit flex flex-col items-start">
        <h1 className="font-bold md:text-4xl text-2xl">
          Frequently Asked Questions
        </h1>
        <p className="md:text-sm text-xs py-2 font-semibold light:text-gray-700 dark:text-gray-200">
          Quick answers to your questions you may have.
        </p>
      </div>
      <Faqs />
      <FaqsGetintouchCard />
    </main>
  );
}
