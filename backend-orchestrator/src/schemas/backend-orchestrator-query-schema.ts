import { z } from "zod";
import { ScreenshotQuerySchema } from "./screenshot-query-schema.js";
import { ScreenshotProcesserQuerySchema } from "./screenshot-processer-query-schema.js";

export const BackendOrchestratorQuerySchema = z.intersection(
  ScreenshotQuerySchema,
  ScreenshotProcesserQuerySchema)

export type BackendOrchestratorQuery = z.infer<typeof BackendOrchestratorQuerySchema>;
