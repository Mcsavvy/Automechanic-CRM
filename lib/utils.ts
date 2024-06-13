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

export function formatMoney(amount: number) {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "NGN",
  }).replace("NGN", "₦");
}
export function formatCurrencyShort(value: number) {
  const absValue = Math.abs(value);
  let abbreviatedValue;
  let suffix = '';

  if (absValue >= 1e12) {
    abbreviatedValue = (value / 1e12).toFixed(1);
    suffix = 'tn';
  } else if (absValue >= 1e9) {
    abbreviatedValue = (value / 1e9).toFixed(1);
    suffix = 'bn';
  } else if (absValue >= 1e6) {
    abbreviatedValue = (value / 1e6).toFixed(1);
    suffix = 'm';
  } else if (absValue >= 1e3) {
    abbreviatedValue = (value / 1e3).toFixed(1);
    suffix = 'k';
  } else {
    abbreviatedValue = value.toFixed(2);
  }

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: "NGN",
    minimumFractionDigits: abbreviatedValue.includes('.') ? 1 : 0,
    maximumFractionDigits: 1,
  });

  return formatter.format(parseFloat(abbreviatedValue)).replace("NGN", "₦") + suffix;
}
