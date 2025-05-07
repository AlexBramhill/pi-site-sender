import { z } from "zod";

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

const toNumberArray = z
  .any()
  .transform((val) => Array.from(val)) // Convert iterable/array-like to array
  .pipe(
    z.array(
      z.any().transform((val) => {
        const coerced = Number(val);
        return isNaN(coerced) ? NaN : coerced;
      })
    )
  );

export const WeatherDailySchema = z.object({
  time: z.array(z.coerce.date()),
  temperature2mMin: toNumberArray,
  temperature2mMax: toNumberArray,
  windGusts10mMax: toNumberArray,
  windSpeed10mMax: toNumberArray,
  sunrise: z.array(z.coerce.date()),
  sunset: z.array(z.coerce.date()),
  uvIndexMax: toNumberArray,
  precipitationProbabilityMax: toNumberArray,
  temperature2mMean: toNumberArray,
  precipitationProbabilityMean: toNumberArray,
  windSpeed10mMean: toNumberArray,
  windGusts10mMean: toNumberArray,
  windGusts10mMin: toNumberArray,
  windSpeed10mMin: toNumberArray,
  precipitationHours: toNumberArray,
  precipitationSum: toNumberArray,
  winddirection10mDominant: toNumberArray,
  apparentTemperatureMin: toNumberArray,
  apparentTemperatureMax: toNumberArray,
  windDirection10mDominant: toNumberArray,
  weatherCode: toNumberArray,
  shortwaveRadiationSum: toNumberArray,
  et0FaoEvapotranspiration: toNumberArray,
  daylightDuration: toNumberArray,
  sunshineDuration: toNumberArray,
  uvIndexClearSkyMax: toNumberArray,
  rainSum: toNumberArray,
  showersSum: toNumberArray,
  snowfallSum: toNumberArray,
  apparentTemperatureMean: toNumberArray,
  capeMax: toNumberArray,
  capeMean: toNumberArray,
  capeMin: toNumberArray,
  cloudCoverMean: toNumberArray,
  cloudCoverMax: toNumberArray,
  cloudCoverMin: toNumberArray,
  dewPoint2mMean: toNumberArray,
  dewPoint2mMax: toNumberArray,
  dewPoint2mMin: toNumberArray,
  wetBulbTemperature2mMean: toNumberArray,
  wetBulbTemperature2mMax: toNumberArray,
  wetBulbTemperature2mMin: toNumberArray,
  vapourPressureDeficitMax: toNumberArray,
  growingDegreeDaysBase0Limit50: toNumberArray,
  leafWetnessProbabilityMean: toNumberArray,
  relativeHumidity2mMean: toNumberArray,
  precipitationProbabilityMin: toNumberArray,
  relativeHumidity2mMax: toNumberArray,
  snowfallWaterEquivalentSum: toNumberArray,
  relativeHumidity2mMin: toNumberArray,
  pressureMslMean: toNumberArray,
  pressureMslMax: toNumberArray,
  pressureMslMin: toNumberArray,
  surfacePressureMean: toNumberArray,
  surfacePressureMax: toNumberArray,
  surfacePressureMin: toNumberArray,
  updraftMax: toNumberArray,
  visibilityMean: toNumberArray,
  visibilityMax: toNumberArray,
  visibilityMin: toNumberArray,
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

export const WeatherDtoSchema = z.object({
  location: WeatherLocationSchema,
  weatherData: WeatherSchema,
});

export type WeatherCurrent = z.infer<typeof WeatherCurrentSchema>;

export type WeatherDaily = z.infer<typeof WeatherDailySchema>;

export type Weather = z.infer<typeof WeatherSchema>;

export type WeatherLocation = z.infer<typeof WeatherLocationSchema>;

export type WeatherDto = z.infer<typeof WeatherDtoSchema>;
