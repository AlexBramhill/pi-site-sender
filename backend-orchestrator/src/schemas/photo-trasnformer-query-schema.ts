import { z } from "zod";

// This is a work around due to how express seems to handle empty query params as an empty object and not null
// There is also some further fun around the typing of these query params
export const PhotoTransformerQuerySchema = z
  .object({
    format: z.enum(["jpeg", "png", "bmp"]).optional().default("png"),
  })

export type PhotoTransformerQuery = z.infer<typeof PhotoTransformerQuerySchema>;
