"use client";

import useWeather from "../hooks/use-weather";
import ApiStatusWrapper from "./api-status-wrapper";

export default function WeatherImage() {
  const apiResult = useWeather();
  <ApiStatusWrapper apiResult={apiResult}>
    {(dto) => {
      const weatherCode = dto.data.weatherData.daily.weatherCode[0];
      return (
        <div>
          {weatherCode}
          {weatherCodeLookup[weatherCode]}
        </div>
      );
    }}
  </ApiStatusWrapper>;
}
