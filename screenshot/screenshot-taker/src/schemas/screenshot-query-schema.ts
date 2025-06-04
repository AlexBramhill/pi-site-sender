import { z } from "zod";
import { ScreenshotDimensionsSchema } from "./screenshot-dimensions.js";

export const ScreenshotQuerySchema = z.intersection(
  ScreenshotDimensionsSchema,
  z.object({
    format: z.enum(["jpeg", "png"]).optional().default("png"),
  })
);

export type ScreenshotQuery = z.infer<typeof ScreenshotQuerySchema>;
