import { z } from "zod";
import {
  ScreenshotFormat,
  ScreenshotFormatSchema,
} from "./screenshot-format-schema.js";
import { ScreenshotRotationSchema } from "./screenshot-rotation-schema.js";

export const ScreenshotProcessorQuerySchema = z.object({
  format: ScreenshotFormatSchema.optional().default(ScreenshotFormat.png),
  rotation: ScreenshotRotationSchema.optional().default(0),
});

export type ScreenshotProcessorQuery = z.infer<
  typeof ScreenshotProcessorQuerySchema
>;
