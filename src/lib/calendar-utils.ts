import { addDays } from "date-fns";

interface MarkedTip {
  id: number;
  markedDate: string;
  color: string;
}

/**
 * Convert Tailwind color classes to HSL values for inline styles
 */
export function colorToHsl(colorClass: string): string {
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
    // Add new design token colors
    'bg-tip-green': '138 76% 87%',
    'bg-tip-amber': '48 96% 89%',
    'bg-tip-cyan': '185 96% 90%',
    'bg-tip-yellow': '55 92% 88%',
    'bg-tip-blue': '214 95% 93%',
    'bg-tip-rose': '356 100% 94%',
    'bg-tip-orange': '43 100% 90%',
    'bg-tip-purple': '270 100% 95%',
    'bg-tip-teal': '166 76% 87%',
  };
  return colorMap[colorClass] || '142 76% 76%';
}

/**
 * Create calendar modifiers for each marked tip's week
 * Returns an object with date arrays for each tip
 */
export function getWeekModifiers(markedTips: MarkedTip[]) {
  const modifiers: { [key: string]: Date[] } = {};
  
  markedTips.forEach((tip) => {
    const dates: Date[] = [];
    const startDate = new Date(tip.markedDate);
    
    // Generate 7 days starting from marked date
    for (let i = 0; i < 7; i++) {
      dates.push(addDays(startDate, i));
    }
    
    modifiers[`tip${tip.id}`] = dates;
  });
  
  return modifiers;
}

/**
 * Get all dates covered by marked tips (for highlighting)
 */
export function getAllMarkedDates(markedTips: MarkedTip[]): Date[] {
  const dates: Date[] = [];
  
  markedTips.forEach((tip) => {
    const startDate = new Date(tip.markedDate);
    for (let i = 0; i < 7; i++) {
      dates.push(addDays(startDate, i));
    }
  });
  
  return dates;
}
