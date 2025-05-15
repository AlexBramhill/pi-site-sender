"use client";
import useSWR from "swr";
import {
  Weather,
  WeatherSummaryClientResponseSchema,
} from "../schemas/weather";
import { useApi } from "./use-api";

const useWeather = () => () =>
  useApi({
    apiUrl: "/weather",
    schema: WeatherSummaryClientResponseSchema,
  });

export default useWeather;
