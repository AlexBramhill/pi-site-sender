import { z } from "zod";

export const ScreenshotProcesserQuerySchema = z
  .object({
    format: z.enum(["jpeg", "png", "bmp"]).optional().default("png"),
  })

export type ScreenshotProcesserQuery = z.infer<typeof ScreenshotProcesserQuerySchema>;
