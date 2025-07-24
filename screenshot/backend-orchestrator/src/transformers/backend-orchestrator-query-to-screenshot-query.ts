import type { BackendOrchestratorQuery } from "../schemas/backend-orchestrator-query-schema.js";
import type { EnrichedBackendOrchestratorQuery } from "../schemas/enriched-backend-orchestrator-query-schema.js";
import type { ScreenshotQuery } from "../schemas/screenshot-query-schema.js";
import { ScreenshotQuerySchema } from "../schemas/screenshot-query-schema.js";

export const transformToScreenshotQuery = (
  enrichedQuery: EnrichedBackendOrchestratorQuery

): ScreenshotQuery => {
  if ((enrichedQuery.rotation / 90) % 2 !== 0) {
    console.log("switching width and height due to non-90 degree rotation");
    return ScreenshotQuerySchema.parse({
      width: enrichedQuery.dimensions.height,
      height: enrichedQuery.dimensions.width,
    });
  }
  console.log("no rotation, keeping original dimensions");
  return ScreenshotQuerySchema.parse({
    width: enrichedQuery.dimensions.width,
    height: enrichedQuery.dimensions.height,
  });
};
