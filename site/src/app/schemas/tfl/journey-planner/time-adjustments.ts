import { z } from "zod";
import { TimeAdjustmentSchema } from "./time-adjustment";

export const TimeAdjustmentsSchema = z.object({
  earliest: TimeAdjustmentSchema,
  earlier: TimeAdjustmentSchema,
  later: TimeAdjustmentSchema,
  latest: TimeAdjustmentSchema,
});

export type TimeAdjustments = z.infer<typeof TimeAdjustmentsSchema>;
