import { z } from "zod";
import { ScreenshotFormatSchema } from "./screenshot-format-schema.js";
import { ScreenshotRotationSchema } from "./screenshot-rotation-schema.js";
import { ScreenshotColourProfileSchema } from "./screenshot-colour-profile-schema.js";

export const ScreenshotProcessorQuerySchema = z.object({
  format: ScreenshotFormatSchema,
  rotation: ScreenshotRotationSchema,
  colour_profile: ScreenshotColourProfileSchema,
});

export type ScreenshotProcessorQuery = z.infer<
  typeof ScreenshotProcessorQuerySchema
>;
