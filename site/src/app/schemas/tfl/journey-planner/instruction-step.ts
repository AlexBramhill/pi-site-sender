import { z } from "zod";
import { PathAttributeSchema } from "./path-attribute";

export const InstructionStepSchema = z.object({
  description: z.string(),
  turnDirection: z.string(),
  streetName: z.string(),
  distance: z.number(),
  cumulativeDistance: z.number(),
  skyDirection: z.number(),
  skyDirectionDescription: z.string(),
  cumulativeTravelTime: z.number(),
  latitude: z.number(),
  longitude: z.number(),
  pathAttribute: PathAttributeSchema,
  descriptionHeading: z.string(),
  trackType: z.string(),
  travelTime: z.number(),
  atcoCode: z.string(),
});

export type InstructionStep = z.infer<typeof InstructionStepSchema>;
