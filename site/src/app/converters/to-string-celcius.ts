import { z } from "zod";
export const toStringCelsius = (
  temp: number,
  decimalPlaces: number = 0
): string => {
  const { data, error } = z.number().safeParse(temp);
  if (error) {
    return "N/A";
  }
  return data.toFixed(decimalPlaces) + "°C";
};
