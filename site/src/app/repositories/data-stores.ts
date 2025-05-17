import { LineStatusClientResponseSchema } from "../schemas/line-status";
import { WeatherSummaryClientResponseSchema } from "../schemas/weather";
import { RedisDatastore } from "./redis-data-store";

export const tubeDataStore = new RedisDatastore(
  "tube",
  LineStatusClientResponseSchema
);

export const weatherDataStore = new RedisDatastore(
  "weather",
  WeatherSummaryClientResponseSchema
);
