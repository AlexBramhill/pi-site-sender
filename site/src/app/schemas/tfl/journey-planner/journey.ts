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
  fare: {
    totalCost: z.number(),
    fares: [
      {
        lowZone: z.number(),
        highZone: z.number(),
        cost: z.number(),
        chargeProfileName: z.string(),
        isHopperFare: z.boolean(),
        chargeLevel: z.string(),
        peak: z.number(),
        offPeak: z.number(),
        taps: [
          {
            atcoCode: z.string(),
            tapDetails: {
              modeType: z.string(),
              validationType: z.string(),
              hostDeviceType: z.string(),
              busRouteId: z.string(),
              nationalLocationCode: z.number(),
              tapTimestamp: DateTransformer,
            },
          },
        ],
      },
    ],
    caveats: [
      {
        text: z.string(),
        type: z.string(),
      },
    ],
  },
});

export type Journey = z.infer<typeof JourneySchema>;
