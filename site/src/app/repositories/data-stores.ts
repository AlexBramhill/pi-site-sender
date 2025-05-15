import { LineStatusClientResponseSchema } from "../schemas/line-status";
import { WeatherSummaryClientResponseSchema } from "../schemas/weather";
import { Datastore as DataStore } from "./data-store";

export const tubeDataStore = new DataStore(
  "tube",
  LineStatusClientResponseSchema
);

export const weatherDataStore = new DataStore(
  "weather",
  WeatherSummaryClientResponseSchema
);
