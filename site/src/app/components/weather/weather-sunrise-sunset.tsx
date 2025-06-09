"use client";
import { getTime } from "@/app/converters/to-two-digit-time";
import useWeather from "../../hooks/use-weather";
import ApiStatusWrapper from "../api-status-wrapper";

export default function WeatherToday() {
  const apiResult = useWeather();

  return (
    <ApiStatusWrapper apiResult={apiResult}>
      {(dto) => {
        const { daily } = dto.data.weatherData;

        const sunrise = daily.sunrise[0];
        const sunset = daily.sunset[0];

        return (
          <div className="flex flex-wrap items-center justify-center">
            <p>▲ {getTime(sunrise)}</p>
            <p>▼ {getTime(sunset)}</p>
          </div>
        );
      }}
    </ApiStatusWrapper>
  );
}
