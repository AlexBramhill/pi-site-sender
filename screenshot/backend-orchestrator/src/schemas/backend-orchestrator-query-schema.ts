import { z } from "zod";
import { ScreenshotFormatSchema } from "./screenshot-format-schema.js";
import { ScreenshotRotationSchema } from "./screenshot-rotation-schema.js";
import { ScreenDimensionsSchema } from "./screen/screen-dimensions.js";
import { ScreenColourProfileSchema } from "./screen/screen-colour-profile-schema.js";

export const BackendOrchestratorQuerySchema = z.intersection(
  ScreenDimensionsSchema,
  z.object({
    format: ScreenshotFormatSchema,
    rotation: ScreenshotRotationSchema,
    colour_profile: ScreenColourProfileSchema,
  })
);

export type BackendOrchestratorQuery = z.infer<
  typeof BackendOrchestratorQuerySchema
>;
