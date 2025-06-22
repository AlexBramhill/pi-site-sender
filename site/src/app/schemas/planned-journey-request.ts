import { z } from "zod";
import { LatLongStringSchema } from "./lat-long-string";

export const GetPlannedJourneyRequestQuerySchema = z.object({
  to: LatLongStringSchema,
  from: LatLongStringSchema,
  toName: z.string().optional(),
  fromName: z.string().optional(),
  dateTime: z.string().optional(),
  arrivalOrDeparture: z.enum(["Arriving", "Departing"]).optional(),
});

export type GetPlannedJourneyRequestQuery = z.infer<
  typeof GetPlannedJourneyRequestQuerySchema
>;
