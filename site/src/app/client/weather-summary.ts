import { fetchWeatherApi } from "openmeteo";
import { params } from "./weather-summary-params";
import {
  WeatherSummaryClientResponse,
  WeatherSchema,
} from "@/app/schemas/weather";
/**
 * The below is from the Open Meteo API documentation
 */

export const getWeatherSummary =
  async (): Promise<WeatherSummaryClientResponse> => {
    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, params);

    // Process first location. Add a for-loop for multiple locations or weather models
    const response = responses[0];

    // Attributes for timezone and location
    const utcOffsetSeconds = response.utcOffsetSeconds();
    const timezone = response.timezone();
    const timezoneAbbreviation = response.timezoneAbbreviation();
    const latitude = response.latitude();
    const longitude = response.longitude();

    const current = response.current()!;
    const daily = response.daily()!;

    const sunrise = daily.variables(4)!;
    const sunset = daily.variables(5)!;

    // Validate and transform the weather data using WeatherSchema
    const weatherData = WeatherSchema.parse({
      current: {
        time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
        isDay: current.variables(0)!.value(),
        temperature2m: current.variables(1)!.value(),
        precipitation: current.variables(2)!.value(),
        snowfall: current.variables(3)!.value(),
        showers: current.variables(4)!.value(),
        rain: current.variables(5)!.value(),
        apparentTemperature: current.variables(6)!.value(),
        relativeHumidity2m: current.variables(7)!.value(),
        windSpeed10m: current.variables(8)!.value(),
        windDirection10m: current.variables(9)!.value(),
        windGusts10m: current.variables(10)!.value(),
        weatherCode: current.variables(11)!.value(),
        cloudCover: current.variables(12)!.value(),
        pressureMsl: current.variables(13)!.value(),
        surfacePressure: current.variables(14)!.value(),
      },
      daily: {
        time: [
          ...Array(
            (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval()
          ),
        ].map(
          (_, i) =>
            new Date(
              (Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) *
                1000
            )
        ),
        temperature2mMin: daily.variables(0)!.valuesArray()!,
        temperature2mMax: daily.variables(1)!.valuesArray()!,
        windGusts10mMax: daily.variables(2)!.valuesArray()!,
        windSpeed10mMax: daily.variables(3)!.valuesArray()!,
        sunrise: [...Array(sunrise.valuesInt64Length())].map(
          (_, i) =>
            new Date((Number(sunrise.valuesInt64(i)) + utcOffsetSeconds) * 1000)
        ),
        sunset: [...Array(sunset.valuesInt64Length())].map(
          (_, i) =>
            new Date((Number(sunset.valuesInt64(i)) + utcOffsetSeconds) * 1000)
        ),
        uvIndexMax: daily.variables(6)!.valuesArray()!,
        precipitationProbabilityMax: daily.variables(7)!.valuesArray()!,
        temperature2mMean: daily.variables(8)!.valuesArray()!,
        precipitationProbabilityMean: daily.variables(9)!.valuesArray()!,
        windSpeed10mMean: daily.variables(10)!.valuesArray()!,
        windGusts10mMean: daily.variables(11)!.valuesArray()!,
        windGusts10mMin: daily.variables(12)!.valuesArray()!,
        windSpeed10mMin: daily.variables(13)!.valuesArray()!,
        precipitationHours: daily.variables(14)!.valuesArray()!,
        precipitationSum: daily.variables(15)!.valuesArray()!,
        winddirection10mDominant: daily.variables(16)!.valuesArray()!,
        apparentTemperatureMin: daily.variables(17)!.valuesArray()!,
        apparentTemperatureMax: daily.variables(18)!.valuesArray()!,
        windDirection10mDominant: daily.variables(19)!.valuesArray()!,
        weatherCode: daily.variables(20)!.valuesArray()!,
        shortwaveRadiationSum: daily.variables(21)!.valuesArray()!,
        et0FaoEvapotranspiration: daily.variables(22)!.valuesArray()!,
        daylightDuration: daily.variables(23)!.valuesArray()!,
        sunshineDuration: daily.variables(24)!.valuesArray()!,
        uvIndexClearSkyMax: daily.variables(25)!.valuesArray()!,
        rainSum: daily.variables(26)!.valuesArray()!,
        showersSum: daily.variables(27)!.valuesArray()!,
        snowfallSum: daily.variables(28)!.valuesArray()!,
        apparentTemperatureMean: daily.variables(29)!.valuesArray()!,
        capeMax: daily.variables(30)!.valuesArray()!,
        capeMean: daily.variables(31)!.valuesArray()!,
        capeMin: daily.variables(32)!.valuesArray()!,
        cloudCoverMean: daily.variables(33)!.valuesArray()!,
        cloudCoverMax: daily.variables(34)!.valuesArray()!,
        cloudCoverMin: daily.variables(35)!.valuesArray()!,
        dewPoint2mMean: daily.variables(36)!.valuesArray()!,
        dewPoint2mMax: daily.variables(37)!.valuesArray()!,
        dewPoint2mMin: daily.variables(38)!.valuesArray()!,
        wetBulbTemperature2mMean: daily.variables(39)!.valuesArray()!,
        wetBulbTemperature2mMax: daily.variables(40)!.valuesArray()!,
        wetBulbTemperature2mMin: daily.variables(41)!.valuesArray()!,
        vapourPressureDeficitMax: daily.variables(42)!.valuesArray()!,
        et0FaoEvapotranspirationSum: daily.variables(43)!.valuesArray()!,
        growingDegreeDaysBase0Limit50: daily.variables(44)!.valuesArray()!,
        leafWetnessProbabilityMean: daily.variables(45)!.valuesArray()!,
        relativeHumidity2mMean: daily.variables(46)!.valuesArray()!,
        precipitationProbabilityMin: daily.variables(47)!.valuesArray()!,
        relativeHumidity2mMax: daily.variables(48)!.valuesArray()!,
        snowfallWaterEquivalentSum: daily.variables(49)!.valuesArray()!,
        relativeHumidity2mMin: daily.variables(50)!.valuesArray()!,
        pressureMslMean: daily.variables(51)!.valuesArray()!,
        pressureMslMax: daily.variables(52)!.valuesArray()!,
        pressureMslMin: daily.variables(53)!.valuesArray()!,
        surfacePressureMean: daily.variables(54)!.valuesArray()!,
        surfacePressureMax: daily.variables(55)!.valuesArray()!,
        surfacePressureMin: daily.variables(56)!.valuesArray()!,
        updraftMax: daily.variables(57)!.valuesArray()!,
        visibilityMean: daily.variables(58)!.valuesArray()!,
        visibilityMax: daily.variables(59)!.valuesArray()!,
        visibilityMin: daily.variables(60)!.valuesArray()!,
      },
    });

    return {
      weatherData,
      location: {
        latitude,
        longitude,
        timezone,
        timezoneAbbreviation,
        utcOffsetSeconds,
      },
    };
  };
