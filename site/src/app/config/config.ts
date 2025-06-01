import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const configSchema = z.object({
  TFL_API_KEY: z.coerce.string(),
  HOME_TUBE_LINE_NAME: z.coerce.string(),
  REDIS_URL: z.coerce.string().default("redis://redis:6379"),
});

export const config = configSchema.parse(process.env);
