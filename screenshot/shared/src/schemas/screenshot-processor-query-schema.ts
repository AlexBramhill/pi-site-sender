import { z } from "zod";
import { ScreenshotFormatSchema } from "./screenshot-format-schema.js";

export const ScreenshotProcessorQuerySchema = z.object({
  format: ScreenshotFormatSchema.optional().default("png"),
});

export type ScreenshotProcessorQuery = z.infer<
  typeof ScreenshotProcessorQuerySchema
>;
