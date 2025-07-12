import { z } from "zod";

export const ScreenColourProfileSchema = z.enum([
  "one_bit",
  "two_bit",
  "four_bit_palette",
  "eight_bit_palette",
  "rgb332",
  "rgb565",
  "rgb888",
]);

export const ScreenColourProfile = ScreenColourProfileSchema.enum;

export type ScreenColourProfile = z.infer<
  typeof ScreenColourProfileSchema
>;
