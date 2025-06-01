import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const configSchema = z.object({
  PHOTO_URL: z.coerce.string().default("photo"),
  PHOTO_TRANSFORMER_URL: z.coerce.string().default("redis://redis:6379"),

});

export const config = configSchema.parse(process.env);
