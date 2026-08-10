import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility to smartly merge Tailwind classes, resolving conflicts 
 * (e.g. px-2 py-2 + p-4 -> p-4)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
