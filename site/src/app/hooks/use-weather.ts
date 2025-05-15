"use client";
import {
  WeatherSummaryClientResponseSchema,
} from "../schemas/weather";
import { useApi } from "./use-api";
import { toApiUrl } from "../converters/to-api-url";

const useWeather = () =>
  useApi({
    apiUrl: toApiUrl("/weather"),
    schema: WeatherSummaryClientResponseSchema,
  });

export default useWeather;
