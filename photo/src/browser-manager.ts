import {
  chromium,
  Browser,
  Page,
  BrowserContext,
  BrowserContextOptions,
  LaunchOptions,
} from "playwright";
import { ScreenshotQuery } from "./schemas/query-schema";

class BrowserManager {
  private static instance: BrowserManager | null = null;
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
    if (!BrowserManager.instance) {
      BrowserManager.instance = new BrowserManager();
      await BrowserManager.instance.init(contextOptions, launchOptions);
    }

    if (initialPageUrl) {
      await BrowserManager.instance.visitPage(initialPageUrl);
    }

    return BrowserManager.instance;
  }

  private async init(
    contextOptions?: BrowserContextOptions,
    launchOptions?: LaunchOptions
  ): Promise<void> {
    this.browser = await chromium.launch(launchOptions);
    this.context = await this.browser.newContext(contextOptions);
    this.page = await this.context.newPage();
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
    ScreenshotQuery: ScreenshotQuery
  ): Promise<Buffer> {
    const page = this.getPage();

    if (ScreenshotQuery) {
      const { width, height } = ScreenshotQuery;
      await page.setViewportSize({ width, height });
    }

    return await page.screenshot({ type: "jpeg", quality: 100 });
  }

  public async closeBrowser(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
      this.context = null;
      this.page = null;
      BrowserManager.instance = null;
    }
  }
}

export default BrowserManager;
