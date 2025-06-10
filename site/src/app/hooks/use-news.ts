"use client";
import { useApi } from "./use-api";
import { toApiUrl } from "../converters/to-api-url";
import { BbcRssClientResponseSchema } from "../schemas/bbc-rss";

const useNews = () =>
  useApi({
    apiUrl: toApiUrl("/news"),
    schema: BbcRssClientResponseSchema,
  });

export default useNews;
