import { cn } from '@/lib/utils';

export default function HalfCircleGradient({ position }: { position: string }) {
  return (
    <div
      className={cn(
        'absolute left-1/2 transform -translate-x-1/2 w-[100%] sm:w-[90%]  blur-[130px] bg-no-repeat -z-10',
        {
          '-top-52 sm:-top-32 bg-gradient-to-b from-[#2563EB]/40 to-[#3672E3]/20 rounded-b-full h-[420px]':
            position === 'top',
          'sm:bottom-0 bg-gradient-to-t from-[#2563EB]/40 to-[#3672E3]/20 rounded-t-full h-[500px] overflow-hidden':
            position === 'bottom',
        }
      )}
    ></div>
  );
}
