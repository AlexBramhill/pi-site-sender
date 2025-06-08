import { z } from "zod";
import { ScreenshotFormatSchema } from "./screenshot-format-schema.js";
import { ScreenshotRotationSchema } from "./screenshot-rotation-schema.js";
import { ScreenshotDimensionsSchema } from "./screenshot-dimensions.js";
import { ScreenshotColourProfileSchema } from "./screenshot-colour-profile-schema.js";

export const BackendOrchestratorQuerySchema = z.intersection(
  ScreenshotDimensionsSchema,
  z.object({
    format: ScreenshotFormatSchema,
    rotation: ScreenshotRotationSchema,
    colour_profile: ScreenshotColourProfileSchema,
  })
);

export type BackendOrchestratorQuery = z.infer<
  typeof BackendOrchestratorQuerySchema
>;
