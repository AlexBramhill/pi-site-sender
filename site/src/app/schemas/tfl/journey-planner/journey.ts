import { DateTransformer } from "@/app/transformers.ts/date-transformer";
import { z } from "zod";
import { LegSchema } from "./leg";

export const JourneySchema = z.object({
  startDateTime: DateTransformer,
  duration: z.number(),
  arrivalDateTime: DateTransformer,
  description: z.string(),
  alternativeRoute: z.boolean(),
  legs: z.array(LegSchema),
  fare: z.object({
    totalCost: z.number(),
    fares: z.array(
      z.object({
        lowZone: z.number(),
        highZone: z.number(),
        cost: z.number(),
        chargeProfileName: z.string(),
        isHopperFare: z.boolean(),
        chargeLevel: z.string(),
        peak: z.number(),
        offPeak: z.number(),
        taps: z.array(
          z.object({
            atcoCode: z.string(),
            tapDetails: z.object({
              modeType: z.string(),
              validationType: z.string(),
              hostDeviceType: z.string(),
              busRouteId: z.string(),
              nationalLocationCode: z.number(),
              tapTimestamp: DateTransformer,
            }),
          })
        ),
      })
    ),
    caveats: z.array(
      z.object({
        text: z.string(),
        type: z.string(),
      })
    ),
  }),
});

export type Journey = z.infer<typeof JourneySchema>;
