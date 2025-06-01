import { z } from "zod";
import { PhotoQuerySchema } from "./photo-query-schema.js";
import { PhotoTransformerQuerySchema } from "./photo-trasnformer-query-schema.js";

export const BackendOrchestratorQuerySchema = z.intersection(
  PhotoQuerySchema,
  PhotoTransformerQuerySchema)

export type BackendOrchestratorQuery = z.infer<typeof BackendOrchestratorQuerySchema>;
