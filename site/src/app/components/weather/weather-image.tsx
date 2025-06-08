"use client";

import Image from "next/image";
import useWeather from "../../hooks/use-weather";
import ApiStatusWrapper from "../api-status-wrapper";
import { weatherCodeLookup } from "../../client/weather-codes";

export default function WeatherImage() {
  const apiResult = useWeather();

  return (
    <ApiStatusWrapper apiResult={apiResult}>
      {(dto) => {
        const weatherCode = dto.data.weatherData.daily.weatherCode[0];
        const weather = weatherCodeLookup[weatherCode];

        return (
          <div className="flex flex-wrap items-center justify-center">
            <Image
              src={`/svg/amcharts_weather_icons_1.0.0/static/${weather.nightIcon}`}
              alt={weather.description}
              width={64}
              height={64}
            />
            <p className="text-center">{weather.description}</p>
          </div>
        );
      }}
    </ApiStatusWrapper>
  );
}
