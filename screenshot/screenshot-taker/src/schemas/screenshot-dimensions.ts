import z from "zod";

// This is a work around due to how express seems to handle empty query params as an empty object and not null
// There is also some further fun around the typing of these query params
export const ScreenshotDimensionsSchema = z.object({
  width: z.number({ coerce: true }).optional().default(1920),
  height: z.number({ coerce: true }).optional().default(1080),
});
