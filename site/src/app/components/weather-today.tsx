"use client";
import { FIFTEEN_MINUTES_IN_MS } from "../consts/time";
import useWeather from "../hooks/use-weather";
import { toStringCelsius } from "../converters/to-string-celcius";
import { toTwoDigitTime } from "../converters/to-two-digit-time";
import styles from "./../page.module.css";
import { toPercent } from "../converters/to-percent";
import ApiStatusWrapper from "./api-status-wrapper";

export default function WeatherToday() {
  const apiResult = useWeather();

  return (
    <ApiStatusWrapper apiResult={apiResult}>
      {(dto) => (
        <div>
          <h2 style={{ display: "inline", margin: 0 }}>
            {toStringCelsius(dto.data.weatherData.current.temperature2m, 0)} (
            {toStringCelsius(
              dto.data.weatherData.daily.temperature2mMean[0],
              0
            )}
            )
          </h2>
          <p>
            {toStringCelsius(dto.data.weatherData.daily.temperature2mMin[0])} -{" "}
            {toStringCelsius(dto.data.weatherData.daily.temperature2mMax[0], 0)}
          </p>
          <p>
            {" "}
            {toPercent(
              dto.data.weatherData.daily.precipitationProbabilityMean[0]
            )}{" "}
            rain
          </p>
          <p>▲ {toTwoDigitTime(dto.data.weatherData.daily.sunrise[0])}</p>
          <p>▼ {toTwoDigitTime(dto.data.weatherData.daily.sunset[0])}</p>
        </div>
      )}
    </ApiStatusWrapper>
  );
}
