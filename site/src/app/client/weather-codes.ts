export const weatherCodeLookup: Record<
  number,
  {
    description: string;
    dayIcon: string;
    nightIcon: string;
  }
> = {
  0: {
    description: "Clear",
    dayIcon: "day.svg",
    nightIcon: "night.svg",
  },
  1: {
    description: "Mainly clear",
    dayIcon: "day.svg",
    nightIcon: "night.svg",
  },
  2: {
    description: "Partly cloudy",
    dayIcon: "cloudy-day-1.svg",
    nightIcon: "cloudy-night-1.svg",
  },
  3: {
    description: "Overcast",
    dayIcon: "cloudy.svg",
    nightIcon: "cloudy.svg",
  },
  45: {
    description: "Fog",
    dayIcon: "cloudy.svg",
    nightIcon: "cloudy.svg",
  },
  48: {
    description: "Rime fog",
    dayIcon: "cloudy.svg",
    nightIcon: "cloudy.svg",
  },
  51: {
    description: "Light Drizzle",
    dayIcon: "rainy-4.svg",
    nightIcon: "rainy-4.svg",
  },
  53: {
    description: "Moderate Drizzle",
    dayIcon: "rainy-5.svg",
    nightIcon: "rainy-5.svg",
  },
  55: {
    description: "Dense Drizzle",
    dayIcon: "rainy-5.svg",
    nightIcon: "rainy-5.svg",
  },
  56: {
    description: "Light Freezing Drizzle",
    dayIcon: "rainy-4.svg",
    nightIcon: "rainy-4.svg",
  },
  57: {
    description: "Dense Freezing Drizzle",
    dayIcon: "rainy-5.svg",
    nightIcon: "rainy-5.svg",
  },
  61: {
    description: "Slight Rain",
    dayIcon: "rainy-4.svg",
    nightIcon: "rainy-4.svg",
  },
  63: {
    description: "Moderate Rain",
    dayIcon: "rainy-5.svg",
    nightIcon: "rainy-5.svg",
  },
  65: {
    description: "Heavy Rain",
    dayIcon: "rainy-6.svg",
    nightIcon: "rainy-6.svg",
  },
  66: {
    description: "Light Freezing Rain",
    dayIcon: "rainy-4.svg",
    nightIcon: "rainy-4.svg",
  },
  67: {
    description: "Heavy Freezing Rain",
    dayIcon: "rainy-6.svg",
    nightIcon: "rainy-6.svg",
  },
  71: {
    description: "Slight Snow fall",
    dayIcon: "snowy-4.svg",
    nightIcon: "snowy-4.svg",
  },
  73: {
    description: "Moderate Snow fall",
    dayIcon: "snowy-5.svg",
    nightIcon: "snowy-5.svg",
  },
  75: {
    description: "Heavy Snow fall",
    dayIcon: "snowy-6.svg",
    nightIcon: "snowy-6.svg",
  },
  77: {
    description: "Snow grains",
    dayIcon: "snowy-4.svg",
    nightIcon: "snowy-4.svg",
  },
  80: {
    description: "Slight Rain showers",
    dayIcon: "rainy-4.svg",
    nightIcon: "rainy-4.svg",
  },
  81: {
    description: "Moderate Rain showers",
    dayIcon: "rainy-5.svg",
    nightIcon: "rainy-5.svg",
  },
  82: {
    description: "Violent Rain showers",
    dayIcon: "rainy-6.svg",
    nightIcon: "rainy-6.svg",
  },
  85: {
    description: "Slight Snow showers",
    dayIcon: "snowy-4.svg",
    nightIcon: "snowy-4.svg",
  },
  86: {
    description: "Heavy Snow showers",
    dayIcon: "snowy-6.svg",
    nightIcon: "snowy-6.svg",
  },
  95: {
    description: "Storm",
    dayIcon: "thunder.svg",
    nightIcon: "thunder.svg",
  },
  96: {
    description: "Slight Hail Storm",
    dayIcon: "thunder.svg",
    nightIcon: "thunder.svg",
  },
  99: {
    description: "Heavy Hail Storm",
    dayIcon: "thunder.svg",
    nightIcon: "thunder.svg",
  },
};
