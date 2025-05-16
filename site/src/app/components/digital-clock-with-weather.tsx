"use client";

import React from "react";
import useClock from "../hooks/use-clock";
import { toTwoDigitTime } from "../converters/to-two-digit-time";
import useWeather from "../hooks/use-weather";
import { toStringCelsius } from "../converters/to-string-celcius";
import ApiStatusWrapper from "./api-status-wrapper";
import styles from "./inner-grid.module.css";

const DigitalClockWithWeather = () => {
  const time = useClock();
  const weather = useWeather();

  return (
    <ApiStatusWrapper apiResult={weather}>
      {(dto) => {
        const { daily, current } = dto.data.weatherData;

        return (
          <div className={styles.container}>
            <div className={styles.top}>
              <h2>{toTwoDigitTime(time)}</h2>
            </div>
            <div className={styles.bottom}>
              <p style={{ display: "inline", margin: 0 }}>
                {toStringCelsius(current.temperature2m, 0)} (
                {toStringCelsius(daily.temperature2mMean[0], 0)})
              </p>
              <p>
                {toStringCelsius(daily.temperature2mMin[0])} -{" "}
                {toStringCelsius(daily.temperature2mMax[0], 0)}
              </p>
              <p>▲ {toTwoDigitTime(daily.sunrise[0])}</p>
              <p>▼ {toTwoDigitTime(daily.sunset[0])}</p>
            </div>
          </div>
        );
      }}
    </ApiStatusWrapper>
  );
};

export default DigitalClockWithWeather;
