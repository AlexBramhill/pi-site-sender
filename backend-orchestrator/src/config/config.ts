import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const configSchema = z.object({
  PHOTO_REQUEST_FORMAT: z.enum(["png", "jpeg"]).default("png"),
});

export const config = configSchema.parse(process.env);
