import { z } from "zod";

export const LatLongStringSchema = z
  .string()
  .regex(
    /^-?\d{1,2}(\.\d+)?,-?\d{1,3}(\.\d+)?$/,
    "Must be a string in 'lat,long' format"
  )
  .refine(
    (val) => {
      const [lat, lng] = val.split(",").map(Number);
      return (
        !isNaN(lat) &&
        !isNaN(lng) &&
        lat >= -90 &&
        lat <= 90 &&
        lng >= -180 &&
        lng <= 180
      );
    },
    {
      message:
        "Latitude must be between -90 and 90, longitude between -180 and 180",
    }
  );

export type LatLongString = z.infer<typeof LatLongStringSchema>;
