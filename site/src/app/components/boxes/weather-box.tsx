import { BoxConfig } from "../grid/box-config";
import { ColumnFill } from "../layout/column-fill";
import { WeatherFeelsLikeTemp } from "../weather/weather-feels-like-temp";
import WeatherImage from "../weather/weather-image";
import { WeatherMinMaxTemp } from "../weather/weather-min-max-temp";
import WeatherRain from "../weather/weather-rain";
import WeatherSunriseSunset from "../weather/weather-sunrise-sunset";
import { WeatherTemp } from "../weather/weather-temp";

const weatherContent: React.ReactNode = (
  <ColumnFill>
    <WeatherImage />
    <WeatherRain />
    <WeatherTemp />
    <WeatherFeelsLikeTemp />
    <WeatherMinMaxTemp />
    <WeatherSunriseSunset />
  </ColumnFill>
);
export const weatherBoxConfig: BoxConfig = {
  key: "weather",
  minCols: 1,
  minRows: 1,
  preferredCols: 1,
  preferredRows: 2,
  content: weatherContent,
};
