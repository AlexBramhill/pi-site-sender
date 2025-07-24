import { z } from "zod";
import { ScreenshotFormatSchema } from "./screenshot-format-schema.js";
import { ScreenRotationSchema } from "./screen-rotation-schema.js";
import { ScreenColourProfileSchema } from "./screen/screen-colour-profile-schema.js";

export const ScreenshotProcessorQuerySchema = z.object({
  format: ScreenshotFormatSchema,
  rotation: ScreenRotationSchema,
  colour_profile: ScreenColourProfileSchema,
});

export type ScreenshotProcessorQuery = z.infer<
  typeof ScreenshotProcessorQuerySchema
>;
