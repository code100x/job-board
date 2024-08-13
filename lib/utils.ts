import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Creates a debounced version of the provided function that delays its execution 
 * until after a specified wait time has elapsed since the last time it was invoked.
 *
 * @template T - The type of the function to debounce.
 * @param {T} func - The function to debounce.
 * @param {number} [timeout=300] - The number of milliseconds to delay execution.
 * @returns {(...args: Parameters<T>) => void} A debounced version of the provided function.
 */
export function debounce <T extends (...args: any[]) => any>(func: T, timeout = 300){
  let timer: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}