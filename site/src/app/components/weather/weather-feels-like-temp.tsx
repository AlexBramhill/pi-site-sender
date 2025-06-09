"use client";
import { toStringCelsius } from "@/app/converters/to-string-celcius";
import ApiStatusWrapper from "../api-status-wrapper";
import useWeather from "@/app/hooks/use-weather";

export const WeatherFeelsLikeTemp = () => {
  const apiResult = useWeather();

  return (
    <ApiStatusWrapper apiResult={apiResult}>
      {(dto) => {
        const { daily } = dto.data.weatherData;

        const temperature2mMean = daily.temperature2mMean[0];
        return (
          <p className="text-center">
            Feels like {toStringCelsius(temperature2mMean, 0)}
          </p>
        );
      }}
    </ApiStatusWrapper>
  );
};
