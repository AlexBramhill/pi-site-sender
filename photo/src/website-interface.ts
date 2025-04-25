import { chromium, Browser } from "playwright";

type visitPageProps = {
  targetUrl: string;
  width: number;
  height: number;
};

async function visitPage({ targetUrl, width, height }: visitPageProps) {
  let browser: Browser | null = null;
  browser = await chromium.launch();

  const context = await browser.newContext({ viewport: { width, height } });

  const page = await context.newPage();

  await page.goto(targetUrl, { waitUntil: "networkidle" });

  return page;
}

export async function takeScreenshot(visitPageProps: visitPageProps) {
  const page = await visitPage(visitPageProps);
  return page.screenshot({ type: "jpeg" });
}
