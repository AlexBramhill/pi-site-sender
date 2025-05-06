"use-client";
import useSWR from "swr";

type UseWeatherProps = {
  refreshInMs: number;
};

type UseWeatherResult = {
  weather: Date;
  isLoading: boolean;
  error: string | null;
};
const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch weather data");
  return res.json();
};

const useWeather = ({ refreshInMs }: UseWeatherProps): UseWeatherResult => {
  const {
    data: weather,
    error,
    isLoading,
  } = useSWR("/api/weather", fetcher, { refreshInterval: refreshInMs });

  return {
    weather,
    isLoading,
    error: error ? error.message : null,
  };
};

export default useWeather;
