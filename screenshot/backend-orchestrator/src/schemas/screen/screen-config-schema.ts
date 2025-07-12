import { z } from "zod";
import { ScreenDimensionsSchema } from "./screen-dimensions.js";
import { ScreenColourProfileSchema } from "./screen-colour-profile-schema.js";
import { ScreenshotFormatSchema } from "../screenshot-format-schema.js";

export const ScreenConfigSchema = z.object({
    reference: z.string(),
    name: z.string(),
    dimensions: ScreenDimensionsSchema,
    supportedColourProfile: z.array(ScreenColourProfileSchema),
    supportedFormats: z.array(ScreenshotFormatSchema),
});

export type ScreenConfig = z.infer<typeof ScreenConfigSchema>