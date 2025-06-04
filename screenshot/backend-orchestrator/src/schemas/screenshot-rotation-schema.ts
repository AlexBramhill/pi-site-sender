import { z } from "zod";

export const ScreenshotRotationSchema = z.coerce
  .number()
  .refine((val) => [0, 90, 180, 270].includes(val), {
    message: "Rotation must be one of 0, 90, 180, or 270",
  });

export type ScreenshotRotation = z.infer<typeof ScreenshotRotationSchema>;
