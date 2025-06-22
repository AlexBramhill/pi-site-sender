import { z } from "zod";

export const JourneyVectorSchema = z.object({
  from: z.string(),
  to: z.string(),
  via: z.string(),
  uri: z.string(),
});

export type JourneyVector = z.infer<typeof JourneyVectorSchema>;
