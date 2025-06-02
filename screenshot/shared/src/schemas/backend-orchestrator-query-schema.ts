import { z } from "zod";
import { ScreenshotQuerySchema } from "./screenshot-query-schema.js";
import { ScreenshotProcessorQuerySchema } from "./screenshot-processor-query-schema.js";

export const BackendOrchestratorQuerySchema = z.intersection(
  z.lazy(() => ScreenshotQuerySchema),
  z.lazy(() => ScreenshotProcessorQuerySchema)
);

export type BackendOrchestratorQuery = z.infer<
  typeof BackendOrchestratorQuerySchema
>;
