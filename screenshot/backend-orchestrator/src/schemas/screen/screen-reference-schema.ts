import { z } from "zod";

export const ScreenReferenceSchema = z.enum(["waveshare_37"]);

export const ScreenReference = ScreenReferenceSchema.enum;

export type ScreenReference = z.infer<typeof ScreenReferenceSchema>;
