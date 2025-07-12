import { z } from "zod";

export const ConfigSchema = z.object({
    PHOTO_REQUEST_FORMAT: z.enum(["png", "jpeg"]).default("png"),
});

export type Config = z.infer<typeof ConfigSchema>