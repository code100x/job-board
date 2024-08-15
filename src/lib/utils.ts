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
