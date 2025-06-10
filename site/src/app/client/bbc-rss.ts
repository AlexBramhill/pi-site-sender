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
  console.log("-------------------------------------");
  console.log("-------------------------------------");
  console.log("-------------------------------------");

  console.dir({ feed }, { depth: null, colors: true });
  console.log("-------------------------------------");
  const result = BbcRssClientResponseSchema.parse(feed.items);
  console.dir(
    { result },
    {
      depth: null,
      colors: true,
    }
  );
  console.log("-------------------------------------");
  console.log("-------------------------------------");
  console.log("-------------------------------------");

  return BbcRssClientResponseSchema.parse(feed.items);
};
