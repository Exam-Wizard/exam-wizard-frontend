import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const daysLeft = (date: string) => {
  const now = new Date();
  const due = new Date(date);
  const diff = due.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

export const findByID = <T extends { id: string }>(
  data: T[] | undefined,
  id: string
): T | undefined => {
  return data?.find((item) => item.id === id);
};
