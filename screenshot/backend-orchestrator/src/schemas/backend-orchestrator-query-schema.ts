import { z } from "zod";
import { ScreenshotFormatSchema } from "./screenshot-format-schema.js";
import { ScreenRotationSchema } from "./screen-rotation-schema.js";
import { ScreenColourProfileSchema } from "./screen/screen-colour-profile-schema.js";
import { ScreenReferenceSchema } from "./screen/screen-reference-schema.js";

export const BackendOrchestratorQuerySchema = z.object({
  screenReference: ScreenReferenceSchema,
  format: ScreenshotFormatSchema.optional(),
  rotation: ScreenRotationSchema.optional(),
  colour_profile: ScreenColourProfileSchema.optional(),
});

export type BackendOrchestratorQuery = z.infer<
  typeof BackendOrchestratorQuerySchema
>;
