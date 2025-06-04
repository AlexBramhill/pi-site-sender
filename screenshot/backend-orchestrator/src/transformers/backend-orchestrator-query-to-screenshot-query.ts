import type { BackendOrchestratorQuery } from "../schemas/backend-orchestrator-query-schema.js";
import type { ScreenshotQuery } from "../schemas/screenshot-query-schema.js";
import { ScreenshotQuerySchema } from "../schemas/screenshot-query-schema.js";

export const transformToScreenshotQuery = (
  originalQuery: BackendOrchestratorQuery
): ScreenshotQuery => {
  if ((originalQuery.rotation / 90) % 2 !== 0) {
    console.log("switching width and height due to non-90 degree rotation");
    return ScreenshotQuerySchema.parse({
      width: originalQuery.height,
      height: originalQuery.width,
    });
  }
  console.log("no rotation, keeping original dimensions");
  return ScreenshotQuerySchema.parse({
    width: originalQuery.width,
    height: originalQuery.height,
  });
};
