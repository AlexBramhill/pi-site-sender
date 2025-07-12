import { z } from "zod";
import { ScreenshotFormatSchema } from "./screenshot-format-schema.js";
import { ScreenshotRotationSchema } from "./screenshot-rotation-schema.js";
import { ScreenColourProfileSchema } from "./screen/screen-colour-profile-schema.js";

export const ScreenshotProcessorQuerySchema = z.object({
  format: ScreenshotFormatSchema,
  rotation: ScreenshotRotationSchema,
  colour_profile: ScreenColourProfileSchema,
});

export type ScreenshotProcessorQuery = z.infer<
  typeof ScreenshotProcessorQuerySchema
>;
