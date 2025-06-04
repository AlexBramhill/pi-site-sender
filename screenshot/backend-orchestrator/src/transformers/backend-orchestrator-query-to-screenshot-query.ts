import type { BackendOrchestratorQuery } from "../schemas/backend-orchestrator-query-schema.js";
import type { ScreenshotQuery } from "../schemas/screenshot-query-schema.js";
import { ScreenshotQuerySchema } from "../schemas/screenshot-query-schema.js";

export const transformToScreenshotQuery = (
  originalQuery: BackendOrchestratorQuery
): ScreenshotQuery => {
  if (originalQuery.rotation % 90 !== 0) {
    return ScreenshotQuerySchema.parse({
      width: originalQuery.height,
      height: originalQuery.width,
    });
  }
  return ScreenshotQuerySchema.parse({
    width: originalQuery.width,
    height: originalQuery.height,
  });
};
