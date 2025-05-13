import { LineStatusSchema } from "../schemas/line-status";
import { WeatherSummarySchema } from "../schemas/weather";
import { Datastore as DataStore } from "./data-store";

export const tubeDataStore = new DataStore({
  tableName: "tube",
  schema: LineStatusSchema,
});

export const weatherDataStore = new DataStore({
  tableName: "weather",
  schema: WeatherSummarySchema,
});
