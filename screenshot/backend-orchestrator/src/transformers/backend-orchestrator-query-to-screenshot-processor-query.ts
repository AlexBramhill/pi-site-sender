import type { BackendOrchestratorQuery } from "../schemas/backend-orchestrator-query-schema.js";
import {
  ScreenshotProcessorQuerySchema,
  type ScreenshotProcessorQuery,
} from "../schemas/screenshot-processor-query-schema.js";

export const transformToScreenshotProcessorQuery = (
  originalQuery: BackendOrchestratorQuery
): ScreenshotProcessorQuery => {
  return ScreenshotProcessorQuerySchema.parse({
    format: originalQuery.format,
    rotation: originalQuery.rotation,
    colour_profile: originalQuery.colour_profile,
  });
};
