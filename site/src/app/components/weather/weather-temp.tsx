"use client";
import { toStringCelsius } from "@/app/converters/to-string-celcius";
import ApiStatusWrapper from "../api-status-wrapper";
import useWeather from "@/app/hooks/use-weather";
import { ColumnFill } from "../layout/column-fill";

export const WeatherTemp = () => {
  const apiResult = useWeather();

  return (
    <ApiStatusWrapper apiResult={apiResult}>
      {(dto) => {
        const { current } = dto.data.weatherData;
        const { temperature2m: temperatureNow } = current;

        return (
          <h2 className="text-center">{toStringCelsius(temperatureNow, 0)}</h2>
        );
      }}
    </ApiStatusWrapper>
  );
};
