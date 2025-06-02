import { z } from "zod";

export const ScreenshotFormatSchema = z.enum(["jpeg", "png", "bmp", "bmp_raw"]);

export const ScreenshotFormat = ScreenshotFormatSchema.enum;

export type ScreenshotFormat = z.infer<typeof ScreenshotFormatSchema>;
