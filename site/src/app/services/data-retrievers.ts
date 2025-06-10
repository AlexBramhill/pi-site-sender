import { getBBCHeadlines } from "../client/bbc-rss";
import { getLineStatus } from "../client/tube";
import { getWeatherSummary } from "../client/weather-summary";
import { config } from "../config/config";
import { FIVE_MINUTES_IN_MS, ONE_MINUTE_IN_MS } from "../consts/time";
import {
  bbcDataStore,
  tubeDataStore,
  weatherDataStore,
} from "../repositories/data-stores";
import { DataRetrieverService } from "./data-retriever";

export const tubeDataRetriever = new DataRetrieverService(
  tubeDataStore,
  ONE_MINUTE_IN_MS,
  ONE_MINUTE_IN_MS,
  () => getLineStatus(config.HOME_TUBE_LINE_NAME)
);

export const weatherDataRetriever = new DataRetrieverService(
  weatherDataStore,
  FIVE_MINUTES_IN_MS,
  ONE_MINUTE_IN_MS,
  () => getWeatherSummary()
);

export const bbcDataRetriever = new DataRetrieverService(
  bbcDataStore,
  FIVE_MINUTES_IN_MS,
  FIVE_MINUTES_IN_MS,
  () => getBBCHeadlines()
);
