/**
 * ==========================================
 * CALENDAR UTILITY FUNCTIONS
 * ==========================================
 * 
 * Reusable calendar helper functions
 */

import { addDays } from 'date-fns';

/**
 * Convert Tailwind color classes to HSL values
 */
export const colorToHsl = (colorClass: string): string => {
  const colorMap: { [key: string]: string } = {
    'bg-green-200': '142 76% 76%',
    'bg-amber-100': '48 96% 89%',
    'bg-cyan-100': '185 96% 90%',
    'bg-yellow-100': '55 92% 88%',
    'bg-blue-100': '214 95% 93%',
    'bg-rose-100': '356 100% 94%',
    'bg-orange-100': '43 100% 90%',
    'bg-purple-100': '270 100% 95%',
    'bg-teal-100': '166 76% 87%',
    'bg-green-100': '138 76% 87%',
  };
  return colorMap[colorClass] || '142 76% 76%';
};

/**
 * Create modifiers for each marked tip's week
 */
export const getWeekModifiers = (markedTips: Array<{ id: number; markedDate: string }>) => {
  const modifiers: { [key: string]: Date[] } = {};
  markedTips.forEach((tip) => {
    const dates: Date[] = [];
    const startDate = new Date(tip.markedDate);
    for (let i = 0; i < 7; i++) {
      dates.push(addDays(startDate, i));
    }
    modifiers[`tip${tip.id}`] = dates;
  });
  return modifiers;
};
