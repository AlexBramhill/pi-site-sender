import { z } from "zod";

export const TimeAdjustmentSchema = z.object({
  date: z.string(),
  time: z.string(),
  timeIs: z.string(),
  uri: z.string(),
});

export type TimeAdjustment = z.infer<typeof TimeAdjustmentSchema>;
