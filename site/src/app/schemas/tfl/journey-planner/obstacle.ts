import { z } from "zod";

export const ObstacleSchema = z.object({
  type: z.string(),
  incline: z.string(),
  stopId: z.number(),
  position: z.string(),
});

export type Obstacle = z.infer<typeof ObstacleSchema>;
