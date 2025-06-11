import { z } from "zod";

export const stopPointSchema = z.object({
  naptanId: z.string().optional(),
  platformName: z.string().optional(),
  stopLetter: z.string().optional(),
  icsCode: z.string().optional(),
  individualStopId: z.string().optional(),
  commonName: z.string().optional(),
  placeType: z.string().optional(),
  additionalProperties: z.record(z.string(), z.string()).optional(),
  lat: z.number(),
  lon: z.number(),
});
