import { z } from 'zod';

// Onboarding schema
export const onboardingSchema = z.union([
  z.literal('true'),
  z.literal('false'),
  z.boolean()
]).transform(val => val === 'true' || val === true);

// Day log entry schema
export const dayLogEntrySchema = z.object({
  type: z.enum(['weight', 'bloodPressure', 'tip']),
  value: z.number(),
  value2: z.number().optional(),
  tipId: z.number().optional(),
});

// Day log schema
export const dayLogSchema = z.object({
  date: z.string(),
  entries: z.array(dayLogEntrySchema),
});

// Array of day logs
export const dayLogsSchema = z.array(dayLogSchema);

// Marked tip schema
export const markedTipSchema = z.object({
  id: z.number(),
  markedDate: z.string(),
  color: z.string(),
});

export const markedTipsSchema = z.array(markedTipSchema);

// Health metrics schema
export const healthMetricsSchema = z.object({
  date: z.string(),
  weight: z.string().optional(),
  systolic: z.string().optional(),
  diastolic: z.string().optional(),
});

// Completed activity schema
export const completedActivitySchema = z.object({
  id: z.string(),
  title: z.string(),
  completedDate: z.string(),
  type: z.enum(['tutorial', 'health-priorities', 'health-metrics']),
});

export const completedActivitiesSchema = z.array(completedActivitySchema);
