import { z } from "zod";
import { ScreenshotQuerySchema } from "./screenshot-query-schema.js";
import { ScreenshotTransformerQuerySchema } from "./screenshot-trasnformer-query-schema.js";

export const BackendOrchestratorQuerySchema = z.intersection(
  ScreenshotQuerySchema,
  ScreenshotTransformerQuerySchema)

export type BackendOrchestratorQuery = z.infer<typeof BackendOrchestratorQuerySchema>;
