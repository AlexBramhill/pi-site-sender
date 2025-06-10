import Parser from "rss-parser";
import {
  BbcRssClientResponseSchema,
  BbcArticle,
  BbcRssClientResponse,
} from "../schemas/bbc-rss";

const parser: Parser<{}, BbcArticle> = new Parser();

export const getBBCHeadlines = async (): Promise<BbcRssClientResponse> => {
  const feed = await parser.parseURL(
    "https://feeds.bbci.co.uk/news/world/rss.xml"
  );

  return BbcRssClientResponseSchema.parse(feed.items);
};
