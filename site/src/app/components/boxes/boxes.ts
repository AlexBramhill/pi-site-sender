import { BoxConfig } from "../grid/box-config";
import { datetimeBoxConfig } from "./datetime-box";
import { newsfeedBoxConfig } from "./news-box";
import { tubeStatusBoxConfig } from "./tube-box";
import { weatherBoxConfig } from "./weather-box";

export const boxes: BoxConfig[] = [
  datetimeBoxConfig,
  tubeStatusBoxConfig,
  weatherBoxConfig,
  newsfeedBoxConfig,
];
