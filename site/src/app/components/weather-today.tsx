"use client";
import useWeather from "../hooks/use-weather";
import { toStringCelsius } from "../converters/to-string-celcius";
import { toTwoDigitTime } from "../converters/to-two-digit-time";
import { toPercent } from "../converters/to-percent";
import ApiStatusWrapper from "./api-status-wrapper";

export default function WeatherToday() {
  const apiResult = useWeather();

  return (
    <ApiStatusWrapper apiResult={apiResult}>
      {(dto) => {
        const { daily, current } = dto.data.weatherData;
        return (
          <div>
            <h2 style={{ display: "inline", margin: 0 }}>
              {toStringCelsius(current.temperature2m, 0)} (
              {toStringCelsius(daily.temperature2mMean[0], 0)})
            </h2>
            <p>
              {toStringCelsius(daily.temperature2mMin[0])} -{" "}
              {toStringCelsius(daily.temperature2mMax[0], 0)}
            </p>
            <p> {toPercent(daily.precipitationProbabilityMean[0])} rain</p>
            <p>▲ {toTwoDigitTime(daily.sunrise[0])}</p>
            <p>▼ {toTwoDigitTime(daily.sunset[0])}</p>
          </div>
        );
      }}
    </ApiStatusWrapper>
  );
}
