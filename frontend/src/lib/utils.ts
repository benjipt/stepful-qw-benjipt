import { type ClassValue, clsx } from 'clsx';
import { Duration } from 'luxon';
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

// Performs 3 passes, but as each status is short, simpler implementation is preferred over performance.
// Converts snake_case to Title Case, e.g. "not_yet_started" -> "Not Yet Started".
// This is useful for displaying statuses in a user-friendly way.
export function humanizeStatus(status: string): string {
  return status
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Converts a number of seconds to a human-readable string using Luxon's toHuman().
// E.g. 5405 -> "1 hour, 30 minutes, 5 seconds". Zero-value units are omitted.
export function humanizeDuration(timeInSeconds: number): string {
  return Duration.fromObject({ seconds: timeInSeconds })
    .shiftTo('hours', 'minutes')
    .toHuman({ maximumFractionDigits: 0 });
}
