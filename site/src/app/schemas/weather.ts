import { z } from "zod";
import { FailureDtoSchema, getSuccessDtoSchema } from "./Dto";

/**
 * This is a horrible zod schema to change metroapi weather data to a more usable format
 * without having to touch the parsing they provide as copy and pastable code on their website
 */

export const WeatherCurrentSchema = z.object({
  time: z.coerce.date(),
  isDay: z.coerce.boolean(),
  temperature2m: z.number(),
  precipitation: z.number(),
  snowfall: z.number(),
  showers: z.number(),
  rain: z.number(),
  apparentTemperature: z.number(),
  relativeHumidity2m: z.number(),
  windSpeed10m: z.number(),
  windDirection10m: z.number(),
  windGusts10m: z.number(),
  weatherCode: z.number(),
  cloudCover: z.number(),
  pressureMsl: z.number(),
  surfacePressure: z.number(),
});

const float32ArrayToNumberArray = z
  .custom<Float32Array | number[]>(
    (val) => Array.isArray(val) || val instanceof Float32Array,
    {
      message: "Expected a Float32Array or number[]",
    }
  )
  .transform((val) => {
    if (Array.isArray(val)) {
      return val as number[];
    }
    return Array.from(val as Float32Array);
  });

export const WeatherDailySchema = z.object({
  time: z.array(z.coerce.date()),
  temperature2mMin: float32ArrayToNumberArray,
  temperature2mMax: float32ArrayToNumberArray,
  windGusts10mMax: float32ArrayToNumberArray,
  windSpeed10mMax: float32ArrayToNumberArray,
  sunrise: z.array(z.coerce.date()),
  sunset: z.array(z.coerce.date()),
  uvIndexMax: float32ArrayToNumberArray,
  precipitationProbabilityMax: float32ArrayToNumberArray,
  temperature2mMean: float32ArrayToNumberArray,
  precipitationProbabilityMean: float32ArrayToNumberArray,
  windSpeed10mMean: float32ArrayToNumberArray,
  windGusts10mMean: float32ArrayToNumberArray,
  windGusts10mMin: float32ArrayToNumberArray,
  windSpeed10mMin: float32ArrayToNumberArray,
  precipitationHours: float32ArrayToNumberArray,
  precipitationSum: float32ArrayToNumberArray,
  winddirection10mDominant: float32ArrayToNumberArray,
  apparentTemperatureMin: float32ArrayToNumberArray,
  apparentTemperatureMax: float32ArrayToNumberArray,
  windDirection10mDominant: float32ArrayToNumberArray,
  weatherCode: float32ArrayToNumberArray,
  shortwaveRadiationSum: float32ArrayToNumberArray,
  et0FaoEvapotranspiration: float32ArrayToNumberArray,
  daylightDuration: float32ArrayToNumberArray,
  sunshineDuration: float32ArrayToNumberArray,
  uvIndexClearSkyMax: float32ArrayToNumberArray,
  rainSum: float32ArrayToNumberArray,
  showersSum: float32ArrayToNumberArray,
  snowfallSum: float32ArrayToNumberArray,
  apparentTemperatureMean: float32ArrayToNumberArray,
  capeMax: float32ArrayToNumberArray,
  capeMean: float32ArrayToNumberArray,
  capeMin: float32ArrayToNumberArray,
  cloudCoverMean: float32ArrayToNumberArray,
  cloudCoverMax: float32ArrayToNumberArray,
  cloudCoverMin: float32ArrayToNumberArray,
  dewPoint2mMean: float32ArrayToNumberArray,
  dewPoint2mMax: float32ArrayToNumberArray,
  dewPoint2mMin: float32ArrayToNumberArray,
  wetBulbTemperature2mMean: float32ArrayToNumberArray,
  wetBulbTemperature2mMax: float32ArrayToNumberArray,
  wetBulbTemperature2mMin: float32ArrayToNumberArray,
  vapourPressureDeficitMax: float32ArrayToNumberArray,
  growingDegreeDaysBase0Limit50: float32ArrayToNumberArray,
  leafWetnessProbabilityMean: float32ArrayToNumberArray,
  relativeHumidity2mMean: float32ArrayToNumberArray,
  precipitationProbabilityMin: float32ArrayToNumberArray,
  relativeHumidity2mMax: float32ArrayToNumberArray,
  snowfallWaterEquivalentSum: float32ArrayToNumberArray,
  relativeHumidity2mMin: float32ArrayToNumberArray,
  pressureMslMean: float32ArrayToNumberArray,
  pressureMslMax: float32ArrayToNumberArray,
  pressureMslMin: float32ArrayToNumberArray,
  surfacePressureMean: float32ArrayToNumberArray,
  surfacePressureMax: float32ArrayToNumberArray,
  surfacePressureMin: float32ArrayToNumberArray,
  updraftMax: float32ArrayToNumberArray,
  visibilityMean: float32ArrayToNumberArray,
  visibilityMax: float32ArrayToNumberArray,
  visibilityMin: float32ArrayToNumberArray,
});

export const WeatherSchema = z.object({
  current: WeatherCurrentSchema,
  daily: WeatherDailySchema,
});

export const WeatherLocationSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  timezone: z.string().nullable(),
  timezoneAbbreviation: z.string().nullable(),
  utcOffsetSeconds: z.number(),
});

export const WeatherSummaryClientResponseSchema = z.object({
  location: WeatherLocationSchema,
  weatherData: WeatherSchema,
});

export const WeatherDtoSuccessSchema = getSuccessDtoSchema(
  WeatherSummaryClientResponseSchema
);

export const WeatherDtoSchema = z.union([
  WeatherDtoSuccessSchema,
  FailureDtoSchema,
]);

export type WeatherCurrent = z.infer<typeof WeatherCurrentSchema>;

export type WeatherDaily = z.infer<typeof WeatherDailySchema>;

export type Weather = z.infer<typeof WeatherSchema>;

export type WeatherLocation = z.infer<typeof WeatherLocationSchema>;

export type WeatherSummaryClientResponse = z.infer<
  typeof WeatherSummaryClientResponseSchema
>;

export type WeatherSuccessDto = z.infer<typeof WeatherDtoSuccessSchema>;

export type WeatherDto = z.infer<typeof WeatherDtoSchema>;
