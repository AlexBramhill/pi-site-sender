import {
  chromium,
  type Browser,
  type BrowserContext,
  type BrowserContextOptions,
  type LaunchOptions,
  type Page,
} from "playwright";

import type { ScreenshotQuery } from "./schemas/screenshot-query-schema.js";

class BrowserManager {
  private static instancePromise: Promise<BrowserManager> | null = null;
  private browser: Browser | null = null;
  private context: BrowserContext | null = null;
  private page: Page | null = null;

  private constructor() {}

  public static async getInstance({
    contextOptions,
    launchOptions,
    initialPageUrl,
  }: {
    contextOptions?: BrowserContextOptions;
    launchOptions?: LaunchOptions;
    initialPageUrl?: string;
  }): Promise<BrowserManager> {
    if (!BrowserManager.instancePromise) {
      BrowserManager.instancePromise = BrowserManager.initializeInstance(
        contextOptions,
        launchOptions
      ).catch((error) => {
        BrowserManager.instancePromise = null;
        throw error;
      });
    }

    const instance = await BrowserManager.instancePromise;

    if (initialPageUrl) {
      await instance.visitPage(initialPageUrl);
    }

    return instance;
  }

  private static async initializeInstance(
    contextOptions?: BrowserContextOptions,
    launchOptions?: LaunchOptions
  ): Promise<BrowserManager> {
    const instance = new BrowserManager();
    await instance.init(contextOptions, launchOptions);
    return instance;
  }

  private async init(
    contextOptions?: BrowserContextOptions,
    launchOptions?: LaunchOptions
  ): Promise<void> {
    this.browser = await chromium.launch(launchOptions);

    const mergedContextOptions: BrowserContextOptions = {
      timezoneId: "Europe/London",
      ...contextOptions,
    };

    this.context = await this.browser.newContext(mergedContextOptions);
    this.page = await this.context.newPage();
    await this.page.emulateMedia({ colorScheme: "dark" });
  }

  public getPage(): Page {
    if (!this.page) {
      throw new Error(
        "BrowserManager not initialized. Call getInstance() first."
      );
    }
    return this.page;
  }

  public async visitPage(targetUrl: string): Promise<void> {
    const page = this.getPage();
    await page.goto(targetUrl, { waitUntil: "networkidle" });
  }

  public async takeScreenshot(
    screenshotQuery: ScreenshotQuery
  ): Promise<Buffer> {
    const page = this.getPage();

    const { width, height } = screenshotQuery;
    await page.setViewportSize({ width, height });

    return screenshotQuery.format === "jpeg"
      ? this.takeJpegScreenshot(page)
      : this.takePngScreenshot(page);
  }

  public async closeBrowser(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
      this.context = null;
      this.page = null;
      BrowserManager.instancePromise = null;
    }
  }

  private takePngScreenshot = async (page: Page): Promise<Buffer> =>
    await page.screenshot({
      type: "png",
    });

  private takeJpegScreenshot = async (page: Page): Promise<Buffer> =>
    await page.screenshot({
      type: "jpeg",
      quality: 100,
    });
}

export default BrowserManager;
