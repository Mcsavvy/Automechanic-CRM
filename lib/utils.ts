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
