import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const configSchema = z.object({
  TFL_API_KEY: z.coerce.string(),
  HOME_TUBE_LINE_NAME: z.coerce.string(),
  HOME_STATION_NAPTAN_ID: z.coerce.string(),
  HOME_LAT_LONG: z.coerce.string(),
  WORK_LAT_LONG: z.coerce.string(),
  // HOME_LAT_LONG: LatLongStringSchema,
  // WORK_LAT_LONG: LatLongStringSchema,
  REDIS_URL: z.coerce.string().default("redis://redis:6379"),
});

export const config = configSchema.parse(process.env);
