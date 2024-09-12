import { faqData } from '@/lib/constant/faqs.constants';

export default function Faqs() {
  return (
    <div className="w-full h-fit py-10">
      <div className="w-fit grid grid-cols-1 md:grid-cols-2 gap-6">
        {faqData.map((faq, i) => (
          <div key={i} className="md:mx-5 mx-2 my-2">
            <p className="font-semibold text-base">{`Q. ${faq.question}`}</p>
            <p className="text-gray-700 text-[15px] pl-5">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
