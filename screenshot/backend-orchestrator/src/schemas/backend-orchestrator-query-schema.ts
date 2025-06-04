import { z } from "zod";
import {
  ScreenshotFormat,
  ScreenshotFormatSchema,
} from "./screenshot-format-schema.js";
import { ScreenshotRotationSchema } from "./screenshot-rotation-schema.js";
import { ScreenshotDimensionsSchema } from "./screenshot-dimensions.js";

export const BackendOrchestratorQuerySchema = z.intersection(
  ScreenshotDimensionsSchema,
  z.object({
    format: ScreenshotFormatSchema.optional().default(ScreenshotFormat.png),
    rotation: ScreenshotRotationSchema.optional().default(0),
  })
);

export type BackendOrchestratorQuery = z.infer<
  typeof BackendOrchestratorQuerySchema
>;
