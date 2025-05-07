import {
  chromium,
  Browser,
  Page,
  BrowserContext,
  BrowserContextOptions,
  LaunchOptions,
} from "playwright";
import { ScreenshotQuery } from "./schemas/query-schema";
const { PNG } = require("pngjs");

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

    if (screenshotQuery.width && screenshotQuery.height) {
      const { width, height } = screenshotQuery;
      await page.setViewportSize({ width, height });
    }

    return (await screenshotQuery.format) === "jpeg"
      ? this.takeJpegScreenshot(page)
      : this.takePngScreenshot(page);
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

  private takePngScreenshot = async (page: Page): Promise<Buffer> => {
    const screenshotBuffer = await page.screenshot({
      type: "png",
    });

    return this.convertToOneBit(screenshotBuffer);
  };

  private takeJpegScreenshot = async (page: Page): Promise<Buffer> =>
    await page.screenshot({
      type: "jpeg",
      quality: 100,
    });

  // Hack that needs to be refactored
  private convertToOneBit(screenshotBuffer: Buffer<ArrayBufferLike>) {
    const png = PNG.sync.read(screenshotBuffer);

    for (let y = 0; y < png.height; y++) {
      for (let x = 0; x < png.width; x++) {
        const idx = (png.width * y + x) << 2;
        const grayscale =
          0.3 * png.data[idx] +
          0.59 * png.data[idx + 1] +
          0.11 * png.data[idx + 2];
        const value = grayscale > 128 ? 255 : 0;
        png.data[idx] = value;
        png.data[idx + 1] = value;
        png.data[idx + 2] = value;
      }
    }

    return Buffer.from(PNG.sync.write(png));
  }
}

export default BrowserManager;
