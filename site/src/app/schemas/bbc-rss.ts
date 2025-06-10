import { z } from "zod";
import { DateTransformer } from "../transformers.ts/date-transformer";

export const BbcArticleSchema = z.object({
  title: z.string(),
  link: z.string().url(),
  description: z.string().optional(),
  pubDate: z.coerce.date(),
});

export const BbcRssClientResponseSchema = z.array(BbcArticleSchema);

export type BbcArticle = z.infer<typeof BbcArticleSchema>;
export type BbcRssClientResponse = z.infer<typeof BbcRssClientResponseSchema>;
