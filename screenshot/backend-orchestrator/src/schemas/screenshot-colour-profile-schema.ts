import { z } from "zod";

export const ScreenshotColourProfileSchema = z.enum([
  "one_bit",
  "two_bit",
  "four_bit_palette",
  "eight_bit_palette",
  "rgb332",
  "rgb565",
  "rgb888",
]);

export const ScreenshotColourProfile = ScreenshotColourProfileSchema.enum;

export type ScreenshotColourProfile = z.infer<
  typeof ScreenshotColourProfileSchema
>;
