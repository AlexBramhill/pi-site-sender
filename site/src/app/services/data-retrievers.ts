import { getLineStatus } from "../client/tube";
import { getWeatherSummary } from "../client/weather";
import { config } from "../config/config";
import { FIFTEEN_MINUTES_IN_MS } from "../consts/time";
import { tubeDataStore, weatherDataStore } from "../repositories/data-stores";
import { LineStatusSchema } from "../schemas/line-status";
import { WeatherSummarySchema } from "../schemas/weather";
import { DataRetrieverService } from "./data-retriever";

export const tubeDataRetriever = new DataRetrieverService(
  tubeDataStore,
  FIFTEEN_MINUTES_IN_MS,
  FIFTEEN_MINUTES_IN_MS,
  () => getLineStatus(config.HOME_TUBE_LINE_NAME)
);

export const weatherDataRetriever = new DataRetrieverService(
  weatherDataStore,
  FIFTEEN_MINUTES_IN_MS,
  FIFTEEN_MINUTES_IN_MS,
  () => getWeatherSummary()
);
