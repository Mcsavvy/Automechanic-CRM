import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function cachedRetrieve<IdType, T extends { id: IdType }>(
  cache: T[],
  id: IdType,
  retriever: (id: IdType) => Promise<T>
): Promise<T> {
  const cached = cache.find((item) => item.id === id);
  if (cached) return cached;
  return await retriever(id);
}

/**
 * This function returns a random element from the given array
 */
export function choice<T>(choices: T[]): T {
  return choices[Math.floor(Math.random() * choices.length)];
}

/**
 * This function returns a random integer between the given range
 */
export function randint(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * This function returns a random float between the given range
 */
export function randfloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

/**
 * This function returns a set of random choices from the given array
 */
export function choices<T>(choices: T[], num: number, unique: boolean=false): T[] {
  const result = [];
  const copy = [...choices];
  for (let i = 0; i < num; i++) {
    const index = Math.floor(Math.random() * copy.length);
    if (unique) {
      result.push(copy.splice(index, 1)[0]);
    } else {
      result.push(copy[index]);
    }
  }
  return result;
}

export function randDate(start: Date, end: Date) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}