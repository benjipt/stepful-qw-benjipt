import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toStringParams(
  params: Record<string, unknown>,
): Record<string, string> {
  return Object.fromEntries(
    Object.entries(params).map(([k, v]) => [k, String(v)]),
  );
}
