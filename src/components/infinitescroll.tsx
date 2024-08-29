import React from 'react';
import Marquee from './ui/Marquee';
import Image from 'next/image';
// import Marquee from "@/components/magicui/marquee";

const reviews = [
  {
    name: 'Jack',
    username: '@jack',
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: 'https://avatar.vercel.sh/jack',
  },
  {
    name: 'Jill',
    username: '@jill',
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: 'https://avatar.vercel.sh/jill',
  },
  {
    name: 'John',
    username: '@john',
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: 'https://avatar.vercel.sh/john',
  },
  {
    name: 'Jane',
    username: '@jane',
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: 'https://avatar.vercel.sh/jane',
  },
  {
    name: 'Jenny',
    username: '@jenny',
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: 'https://avatar.vercel.sh/jenny',
  },
  {
    name: 'James',
    username: '@james',
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: 'https://avatar.vercel.sh/james',
  },
];

const imageList = [
  {
    id: 1,
    src: './microsoft.svg',
  },
  {
    id: 2,
    src: './solana.svg',
  },
  {
    id: 3,
    src: './google.svg',
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);

const ReviewCard = ({}) => {
  return (
    <div className="flex flex-row items-center justify-evenly overflow-hidden md:shadow-xl">
      {imageList.concat(imageList).map((item, index) => {
        return (
          <Image
            className="ml-10"
            src={item.src}
            alt="companies"
            width={200}
            height={100}
            key={index}
          />
        );
      })}
    </div>
  );
};

export function MarqueeDemo() {
  return (
    <div className="w-screen relative flex flex-row h-[200px] w-full flex-col items-center justify-center overflow-hidden md:w-full">
      <Marquee pauseOnHover className="[--duration:50s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>

      {/* <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div> */}
    </div>
  );
}

// <figure
//       className={cn(
//         'relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4',
//         // light styles
//         'border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]',
//         // dark styles
//         'dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]'
//       )}
//     >
//      {imageList.concat(imageList).map((item, index) => (
//           <Image
//             className="ml-10"
//             src={item.src}
//             alt="companies"
//             width={200}
//             height={100}
//             key={index}
//           />
//         ))}
//     </figure>
