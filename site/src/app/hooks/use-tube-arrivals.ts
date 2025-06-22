"use client";
import { useApi } from "./use-api";
import { toApiUrl } from "../converters/to-api-url";
import { ArrivalsClientResponseSchema } from "../schemas/arrivials";

const useTubeArrivals = () =>
  useApi({
    apiUrl: toApiUrl("/tube/arrivals"),
    schema: ArrivalsClientResponseSchema,
  });

export default useTubeArrivals;
