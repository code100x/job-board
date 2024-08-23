import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatFilterSearchParams = (params: string[] | string) => {
  if (!Array.isArray(params)) {
    return [params];
  } else {
    return params;
  }
};

export const formatSalary = (salary: number) => {
  if (salary >= 1000) {
    return `${(salary / 1000).toFixed(0)}K`;
  }
  return salary;
};

export const calculateTimeElapsed = (postedAt: Date) => {
  const currentDate = new Date();
  const diffInMs = currentDate.getTime() - postedAt.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
};