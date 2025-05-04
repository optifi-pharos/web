import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function urlExplorer({ address, txHash, type }: { address?: string, txHash?: string, type?: 'transaction' | 'address' }) {
  return `https://pharosscan.xyz/${type === 'address' ? 'address' : 'tx'}/${address || txHash}`;
}