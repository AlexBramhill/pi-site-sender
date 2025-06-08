import { BoxConfig } from "../grid/box-config";
import WeatherImage from "../weather/weather-image";

const weatherContent: React.ReactNode = <WeatherImage />;
export const weatherBoxConfig: BoxConfig = {
  key: "weather",
  minCols: 1,
  minRows: 1,
  preferredCols: 2,
  preferredRows: 2,
  content: weatherContent,
};
