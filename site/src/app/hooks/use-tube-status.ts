"use client";
import { LineStatusClientResponseSchema } from "../schemas/line-status";
import { useApi } from "./use-api";
import { toApiUrl } from "../converters/to-api-url";

const useTubeStatus = () =>
  useApi({
    apiUrl: toApiUrl("/tube/status"),
    schema: LineStatusClientResponseSchema,
  });

export default useTubeStatus;
