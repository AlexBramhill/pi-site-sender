import { chromium, Browser } from "playwright";
import BrowserManager from "./browser-manager";
import { ScreenshotQuery } from "./schemas/query-schema";

type visitPageProps = {
  width: number;
  height: number;
};

export const takeScreenshot = async (ScreenshotQuery: ScreenshotQuery) => {
  const PORT_REMOTE = 3000;

  const targetUrl = `http://site:${PORT_REMOTE}`;

  const browserManager = await BrowserManager.getInstance({
    initialPageUrl: targetUrl,
  });

  return browserManager.takeScreenshot(ScreenshotQuery);
};
