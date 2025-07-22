import { z } from "zod";
import { ScreenshotFormatSchema } from "./screenshot-format-schema.js";
import { ScreenshotRotationSchema } from "./screenshot-rotation-schema.js";
import { ScreenColourProfileSchema } from "./screen/screen-colour-profile-schema.js";
import { ScreenReferenceSchema } from "./screen/screen-reference-schema.js";

export const BackendOrchestratorQuerySchema = z.object(
  {
    screenReference: ScreenReferenceSchema,
    format: ScreenshotFormatSchema,
    rotation: ScreenshotRotationSchema,
    colour_profile: ScreenColourProfileSchema,
  }
);

export type BackendOrchestratorQuery = z.infer<
  typeof BackendOrchestratorQuerySchema
>;
