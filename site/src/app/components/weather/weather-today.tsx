"use client";
import useWeather from "../../hooks/use-weather";
import { toStringCelsius } from "../../converters/to-string-celcius";
import { toPercent } from "../../converters/to-percent";
import ApiStatusWrapper from "../api-status-wrapper";

export default function WeatherToday() {
  const apiResult = useWeather();

  return (
    <ApiStatusWrapper apiResult={apiResult}>
      {(dto) => {
        const { daily, current } = dto.data.weatherData;
        const { temperature2m: temperatureNow } = current;

        const temperature2mMean = daily.temperature2mMean[0];
        const temperature2mMin = daily.temperature2mMin[0];
        const temperature2mMax = daily.temperature2mMax[0];
        const precipitationProbabilityMean =
          daily.precipitationProbabilityMean[0];

        const sunrise = daily.sunrise[0];
        const sunset = daily.sunset[0];

        return (
          <div>
            <h2 style={{ display: "inline", margin: 0 }}>
              {toStringCelsius(temperatureNow, 0)} (
              {toStringCelsius(temperature2mMean, 0)})
            </h2>
            <p>
              {toStringCelsius(temperature2mMin)} -{" "}
              {toStringCelsius(temperature2mMax, 0)}
            </p>
            <p> {toPercent(precipitationProbabilityMean)} rain</p>
            <p>▲ {sunrise.getTime()}</p>
            <p>▼ {sunset.getTime()}</p>
          </div>
        );
      }}
    </ApiStatusWrapper>
  );
}
