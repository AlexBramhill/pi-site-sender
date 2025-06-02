import { z } from "zod";
import { ScreenshotFormatSchema } from "./screenshot-format-schema.js";

export const ScreenshotProcesserQuerySchema = z.object({
  format: ScreenshotFormatSchema.optional().default("png"),
});

export type ScreenshotProcesserQuery = z.infer<
  typeof ScreenshotProcesserQuerySchema
>;

