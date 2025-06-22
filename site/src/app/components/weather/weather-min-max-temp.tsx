"use client";
import { toStringCelsius } from "@/app/converters/to-string-celcius";
import ApiStatusWrapper from "../api-status-wrapper";
import useWeather from "@/app/hooks/use-weather";

export const WeatherMinMaxTemp = () => {
  const apiResult = useWeather();

  return (
    <ApiStatusWrapper apiResult={apiResult}>
      {(dto) => {
        const { daily } = dto.data.weatherData;

        const temperature2mMin = daily.temperature2mMin[0];
        const temperature2mMax = daily.temperature2mMax[0];

        return (
          <p className="text-center">
            {toStringCelsius(temperature2mMin)} -{" "}
            {toStringCelsius(temperature2mMax, 0)}
          </p>
        );
      }}
    </ApiStatusWrapper>
  );
};
