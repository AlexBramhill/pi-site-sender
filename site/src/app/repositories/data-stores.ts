import { ArrivalsClientResponseSchema } from "../schemas/arrivials";
import { BbcRssClientResponseSchema } from "../schemas/bbc-rss";
import { LineStatusClientResponseSchema } from "../schemas/line-status";
import { WeatherSummaryClientResponseSchema } from "../schemas/weather";
import { RedisDatastore } from "./redis-data-store";

export const tubeStatusDataStore = new RedisDatastore(
  "tubeStatus",
  LineStatusClientResponseSchema
);

export const tubeArrivalsDataStore = new RedisDatastore(
  "tubeArrivals",
  ArrivalsClientResponseSchema
);

export const weatherDataStore = new RedisDatastore(
  "weather",
  WeatherSummaryClientResponseSchema
);

export const bbcDataStore = new RedisDatastore(
  "news",
  BbcRssClientResponseSchema
);
