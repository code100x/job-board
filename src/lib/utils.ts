import { EMAIL_VERIFICATION_LINK_EXPIRATION_TIME } from '@/config/auth.config';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getNameInitials = (name: string) => {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('');
  return initials.toUpperCase();
};
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

export const isTokenExpiredUtil = (createdAt: Date) => {
  const now = new Date().getTime();
  const tokenCreationTime = new Date(createdAt).getTime();
  return (
    now - tokenCreationTime > EMAIL_VERIFICATION_LINK_EXPIRATION_TIME * 1000
  );
};
