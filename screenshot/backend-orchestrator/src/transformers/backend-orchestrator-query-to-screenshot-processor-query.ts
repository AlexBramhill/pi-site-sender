import type { BackendOrchestratorQuery } from "../schemas/backend-orchestrator-query-schema.js";
import type { EnrichedBackendOrchestratorQuery } from "../schemas/enriched-backend-orchestrator-query-schema.js";
import {
  ScreenshotProcessorQuerySchema,
  type ScreenshotProcessorQuery,
} from "../schemas/screenshot-processor-query-schema.js";

export const transformToScreenshotProcessorQuery = (
  enrichedQuery: EnrichedBackendOrchestratorQuery
): ScreenshotProcessorQuery => {
  return ScreenshotProcessorQuerySchema.parse({
    format: enrichedQuery.format,
    rotation: enrichedQuery.rotation,
    colour_profile: enrichedQuery.colour_profile,
  });
};
