import { cn } from '@/lib/utils';

export default function HalfCircleGradient({ position }: { position: string }) {
  return (
    <div
      className={cn(
        'absolute left-1/2 transform -translate-x-1/2 w-[90%]  blur-[130px] bg-no-repeat -z-10',
        {
          '-top-28 bg-gradient-to-b from-[#2563EB]/40 to-[#3672E3]/20 rounded-b-full h-[500px]':
            position === 'top',
          'bottom-3 bg-gradient-to-t from-[#2563EB]/40 to-[#3672E3]/20 rounded-t-full h-[700px] overflow-hidden':
            position === 'bottom',
        }
      )}
    ></div>
  );
}
