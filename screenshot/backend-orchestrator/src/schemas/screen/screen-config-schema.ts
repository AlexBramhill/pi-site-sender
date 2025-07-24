import { z } from "zod";
import { ScreenDimensionsSchema } from "./screen-dimensions.js";
import { ScreenColourProfileSchema } from "./screen-colour-profile-schema.js";
import { ScreenshotFormatSchema } from "../screenshot-format-schema.js";
import { ScreenReferenceSchema } from "./screen-reference-schema.js";
import { ScreenRotationSchema } from "../screen-rotation-schema.js";

export const ScreenConfigSchema = z.object({
    name: z.string(),
    dimensions: ScreenDimensionsSchema,
    supportedColourProfile: z.array(ScreenColourProfileSchema),
    defaultColourProfile: ScreenColourProfileSchema,
    supportedFormats: z.array(ScreenshotFormatSchema),
    defaultFormat: ScreenshotFormatSchema,
    defaultRotation: ScreenRotationSchema.default(0),
});

export type ScreenConfig = z.infer<typeof ScreenConfigSchema>