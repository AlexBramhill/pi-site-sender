"use client";

import Image from "next/image";
import useWeather from "../hooks/use-weather";
import ApiStatusWrapper from "./api-status-wrapper";
import { weatherCodeLookup } from "../client/weather-codes";

export default function WeatherImage() {
  const apiResult = useWeather();

  return (
    <ApiStatusWrapper apiResult={apiResult}>
      {(dto) => {
        const weatherCode = dto.data.weatherData.daily.weatherCode[0];

        return (
          <>
            <div>
              <Image
                src={`/svg/amcharts_weather_icons_1.0.0/static/${weatherCodeLookup[weatherCode].nightIcon}`}
                alt={weatherCodeLookup[weatherCode].description}
                width={100}
                height={100}
              />
            </div>
            <div
              style={{
                textAlign: "center",
                position: "relative",
                top: "-20px",
              }}
            >
              {weatherCodeLookup[weatherCode].description}
            </div>
          </>
        );
      }}
    </ApiStatusWrapper>
  );
}
