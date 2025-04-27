import { z } from "zod";

export const ScreenshotQuerySchema = z
  .object({
    width: z.number({ coerce: true }),
    height: z.number({ coerce: true }),
  })
  .optional();

export type ScreenshotQuery = z.infer<typeof ScreenshotQuerySchema>;
