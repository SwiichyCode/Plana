import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const compareStrings = (str1: string, str2: string): boolean => {
  return str1 === str2;
};

export const maskApiKey = (key: string) => {
  if (!key) return '';
  return key.slice(0, 3) + '*'.repeat(25) + key.slice(-4);
};
