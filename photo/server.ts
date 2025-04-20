import express, { Request, Response } from "express";
import { chromium, Browser } from "playwright";
import Jimp from "jimp";

const app = express();
const PORT = 4000;
const PORT_REMOTE = 3000;

app.get("/screenshot", async (req: Request, res: Response) => {
  const targetUrl = `http://site:${PORT_REMOTE}`;
  const width = parseInt(req.query.width as string) || 1280;
  const height = parseInt(req.query.height as string) || 720;
  let browser: Browser | null = null;

  try {
    browser = await chromium.launch();
    const context = await browser.newContext({
      viewport: { width, height }, // Use query parameters
    });
    const page = await context.newPage();
    await page.goto(targetUrl, { waitUntil: "networkidle" });

    // Take a screenshot without any further processing
    const screenshotBuffer = await page.screenshot();

    // Send the raw screenshot as a PNG response
    res.set("Content-Type", "image/png");
    res.send(screenshotBuffer);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Failed to take screenshot");
  } finally {
    if (browser) await browser.close();
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
