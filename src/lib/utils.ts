



import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { colors } from "./design-tokens";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Get tip card color by index (cycles through colors)
 */
export function getTipColor(index: number): string {
  const tipColors = [
    'bg-tip-green',
    'bg-tip-amber',
    'bg-tip-cyan',
    'bg-tip-yellow',
    'bg-tip-blue',
    'bg-tip-rose',
    'bg-tip-orange',
    'bg-tip-purple',
    'bg-tip-teal',
  ];
  return tipColors[index % tipColors.length];
}

/**
 * Get raw color value from design tokens
 */
export function getColor(path: string): string {
  const parts = path.split('.');
  let value: any = colors;
  
  for (const part of parts) {
    value = value[part];
    if (value === undefined) return '';
  }
  
  return value;
}
