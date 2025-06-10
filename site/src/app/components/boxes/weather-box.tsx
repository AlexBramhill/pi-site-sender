import { BoxConfig } from "../grid/box-config";
import { ColumnFill } from "../layout/column-fill";
import { HorizontalLine } from "../layout/horizontal-line";
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
    <div>
      <HorizontalLine className="my-4" />
      <WeatherTemp />
    </div>
    <WeatherFeelsLikeTemp />
    <WeatherMinMaxTemp />
    <div>
      <HorizontalLine className="my-4" />
      <WeatherSunriseSunset />
    </div>
  </ColumnFill>
);

export const weatherBoxConfig: BoxConfig = {
  key: "weather",
  minCols: 1,
  minRows: 1,
  preferredCols: 1,
  preferredRows: 3,
  content: weatherContent,
};
