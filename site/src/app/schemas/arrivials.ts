import { z } from "zod";

export const ArrivalClientResponseSchema = z.object({
  $type: z.string(),
  id: z.string(),
  operationType: z.number(),
  vehicleId: z.string(),
  naptanId: z.string(),
  stationName: z.string(),
  lineId: z.string(),
  lineName: z.string(),
  platformName: z.string(),
  direction: z.string(),
  bearing: z.string().optional(),
  destinationNaptanId: z.string(),
  destinationName: z.string(),
  timestamp: z.coerce.date(),
  timeToStation: z.number(), // in seconds
  currentLocation: z.string(),
  towards: z.string(),
  expectedArrival: z.coerce.date(),
  timeToLive: z.coerce.date(),
  modeName: z.string(),
  timing: z.object({
    $type: z.string(),
    countdownServerAdjustment: z.string(),
    source: z.coerce.date().optional(),
    insert: z.coerce.date().optional(),
    read: z.coerce.date().optional(),
    sent: z.coerce.date().optional(),
    received: z.coerce.date().optional(),
  }),
});
export const ArrivalsClientResponseSchema = z.array(
  ArrivalClientResponseSchema
);

export type ArrivalsClientResponse = z.infer<
  typeof ArrivalsClientResponseSchema
>;

export type ArrivalClientResponse = z.infer<typeof ArrivalClientResponseSchema>;
