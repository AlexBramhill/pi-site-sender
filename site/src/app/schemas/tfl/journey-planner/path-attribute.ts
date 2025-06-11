import { z } from "zod";

export const PathAttributeSchema = z.object({
  name: z.string(),
  value: z.string(),
});

export type PathAttribute = z.infer<typeof PathAttributeSchema>;
