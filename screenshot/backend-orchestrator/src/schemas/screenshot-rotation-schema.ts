import { z } from "zod";

export const ScreenshotRotationSchema = z.union([
  z.literal(0),
  z.literal(90),
  z.literal(180),
  z.literal(270),
]);

export type ScreenshotRotation = z.infer<typeof ScreenshotRotationSchema>;
