import { config } from "../config/config.js";
import { toQueryParamString } from "../helpers/to-query-params.js";
import type { ScreenshotQuery } from "../schemas/screenshot-query-schema.js";

export const getWebsitePageScreenshot = async (
  screenshotPath: string,
  params: ScreenshotQuery
): Promise<ArrayBuffer> => {
  const query = toQueryParamString({
    ...params,
    format: config.PHOTO_REQUEST_FORMAT,
  });

  console.log(
    `Fetching screenshot from: http://screenshot-taker:4001${screenshotPath}?${query}`
  );

  // TODO: config out this hard coded port
  const response = await fetch(
    `http://screenshot-taker:4001${screenshotPath}?${query}`,
    { method: "GET" }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch screenshot: ${response.statusText}`);
  }

  return response.arrayBuffer();
};
