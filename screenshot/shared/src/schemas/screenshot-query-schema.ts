import { z } from "zod";

export const ScreenshotQuerySchema = z
  .object({
    width: z.number({ coerce: true }).optional(),
    height: z.number({ coerce: true }).optional(),
  })
  .refine(
    (data) =>
      (data.width === undefined && data.height === undefined) ||
      (data.width !== undefined && data.height !== undefined),
    {
      message:
        "Either both width and height must be present, or both must be missing.",
    }
  );

export type ScreenshotQuery = z.infer<typeof ScreenshotQuerySchema>;
