"use client";
import useSWR from "swr";
import {
  Weather,
  WeatherSummaryClientResponseSchema,
} from "../schemas/weather";

type UseWeatherProps = {
  refreshInMs: number;
};

type UseWeatherResult = {
  weather: Weather | undefined;
  isLoading: boolean;
  error: string | null;
};

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch weather data");
  return WeatherSummaryClientResponseSchema.parse(await res.json());
};

export default function useWeather({
  refreshInMs,
}: UseWeatherProps): UseWeatherResult {
  const { data, error, isLoading } = useSWR("/api/weather", fetcher, {
    refreshInterval: refreshInMs,
  });

  return {
    weather: data?.weatherData ?? undefined,
    isLoading,
    error: error ? error.message : null,
  };
}
