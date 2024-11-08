'use client';
import { cn } from '@/lib/utils';

export const LoadingSpinner = (props: { className?: string }) => {
  return (
    <div className="flex justify-center items-center">
      <div
        className={cn(
          'size-6 border-4 border-t-4 border-gray-200 rounded-full animate-spin border-t-blue-500',
          props.className
        )}
      ></div>
    </div>
  );
};
