import { z } from "zod";

export const ArrivingDepartingSchema = z.enum(["Arriving", "Departing"]);

export type ArrivingDeparting = z.infer<typeof ArrivingDepartingSchema>;
