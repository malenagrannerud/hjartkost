/**
 * ==========================================
 * ZOD VALIDATION SCHEMAS
 * ==========================================
 * 
 * Centralized schemas for localStorage data validation
 */

import { z } from 'zod';

// Marked tips schema
export const markedTipSchema = z.object({
  id: z.number(),
  markedDate: z.string(),
  color: z.string(),
});

export const markedTipsSchema = z.array(markedTipSchema);

// Health priorities schema
export const healthPrioritiesSchema = z.object({
  priorities: z.array(z.string()),
  medications: z.array(z.string()),
});

// Health metrics schema
export const healthMetricsSchema = z.object({
  weight: z.string(),
  systolic: z.string(),
  diastolic: z.string(),
  date: z.string(),
});

// Completed activity schema
export const completedActivitySchema = z.object({
  id: z.string(),
  title: z.string(),
  completedDate: z.string(),  // Fixed: was completedAt
  type: z.string(),
});

export const completedActivitiesSchema = z.array(completedActivitySchema);

// Day log entry schema
export const dayLogEntrySchema = z.object({
  type: z.enum(['weight', 'bloodPressure', 'tip']),
  value: z.number(),
  value2: z.number().optional(),
  tipId: z.number().optional(),
});

export const dayLogSchema = z.object({
  date: z.string(),
  entries: z.array(dayLogEntrySchema),
});

export const dayLogsSchema = z.array(dayLogSchema);

// Onboarding completion schema
export const onboardingCompletedSchema = z.boolean();

export type MarkedTip = z.infer<typeof markedTipSchema>;
export type HealthPriorities = z.infer<typeof healthPrioritiesSchema>;
export type HealthMetrics = z.infer<typeof healthMetricsSchema>;
export type CompletedActivity = z.infer<typeof completedActivitySchema>;
export type DayLogEntry = z.infer<typeof dayLogEntrySchema>;
export type DayLog = z.infer<typeof dayLogSchema>;
