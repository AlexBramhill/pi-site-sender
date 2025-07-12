import { z } from "zod";
import { ScreenDimensionsSchema } from "./screen/screen-dimensions.js";

export const ScreenshotQuerySchema = ScreenDimensionsSchema;

export type ScreenshotQuery = z.infer<typeof ScreenshotQuerySchema>;
