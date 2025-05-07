import { z } from "zod";

export const toPercent = (value: number, decimalPlaces: number = 0): string => {
  const { data, error } = z.number().safeParse(value);
  if (error) {
    return "N/A";
  }
  return (data * 100).toFixed(decimalPlaces) + "%";
};
