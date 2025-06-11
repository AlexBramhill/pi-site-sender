import { z } from "zod";
import dotenv from "dotenv";
import { LatLongStringSchema } from "../schemas/lat-long";

dotenv.config();

const configSchema = z.object({
  TFL_API_KEY: z.coerce.string(),
  HOME_TUBE_LINE_NAME: z.coerce.string(),
  HOME_LAT_LONG: LatLongStringSchema,
  WORK_LAT_LONG: LatLongStringSchema,
  REDIS_URL: z.coerce.string().default("redis://redis:6379"),
});

export const config = configSchema.parse(process.env);
