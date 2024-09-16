import Image from 'next/image';
import Marquee from './ui/Marquee';

const logos = [
  { src: '/microsoft.svg', alt: 'Microsoft', width: 190, height: 50 },
  { src: '/google.svg', alt: 'Google', width: 140, height: 25 },
  { src: '/solana.svg', alt: 'Solana', width: 180, height: 50 },
  // Add more logos here
];

export function LogoMarquee() {
  return (
    <div className="relative flex items-center justify-center ">
      <div className="mt-14 sm:mt-24 mb-10 relative flex mx-auto w-[80vw] sm:w-[75vw]  items-center justify-center overflow-hidden  ">
        <Marquee className="[--duration:20s]">
          {logos.map((logo) => (
            <div key={logo.alt} className="px-4 flex items-center">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
              />
            </div>
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r  dark:from-neutral-950"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l  dark:from-neutral-950"></div>
      </div>
    </div>
  );
}
