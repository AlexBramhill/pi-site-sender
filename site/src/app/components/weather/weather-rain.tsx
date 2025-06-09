"use client";
import useWeather from "../../hooks/use-weather";
import { toStringCelsius } from "../../converters/to-string-celcius";
import { toPercent } from "../../converters/to-percent";
import ApiStatusWrapper from "../api-status-wrapper";

export default function WeatherRain() {
  const apiResult = useWeather();

  return (
    <ApiStatusWrapper apiResult={apiResult}>
      {(dto) => {
        const { daily } = dto.data.weatherData;

        const precipitationProbabilityMean =
          daily.precipitationProbabilityMean[0];

        return (
          <p className="text-center">
            {toPercent(precipitationProbabilityMean)} rain
          </p>
        );
      }}
    </ApiStatusWrapper>
  );
}
