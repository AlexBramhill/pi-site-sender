"use client";
import { FIFTEEN_MINUTES_IN_MS } from "../consts/time";
import useWeather from "../hooks/use-weather";
import { toStringCelsius } from "../schemas/to-string-celius";
import { toTwoDigitTime } from "../schemas/to-two-digit-time";
import styles from "./../page.module.css";

export default function WeatherToday() {
  const { weather, isLoading, error } = useWeather({
    refreshInMs: FIFTEEN_MINUTES_IN_MS,
  });

  if (isLoading) return <div className={styles.overlay}>Loading...</div>;
  if (error) return <div className={styles.overlay}>Error: {error}</div>;
  if (!weather) return <div className={styles.overlay}>No data found</div>;

  return (
    <div>
      <h3>{toStringCelsius(weather.current.temperature2m, 0)}</h3>
      {toStringCelsius(weather.daily.temperature2mMax[0], 0)} |{" "}
      <b>{toStringCelsius(weather.daily.temperature2mMean[0], 0)}</b> |{" "}
      {toStringCelsius(weather.daily.temperature2mMin[0])}
      <p>▲ {toTwoDigitTime(weather.daily.sunrise[0])}</p>
      <p>▼ {toTwoDigitTime(weather.daily.sunset[0])}</p>
      <p></p>
    </div>
  );
}
