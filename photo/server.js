const express = require("express");
const { chromium } = require("playwright");
const Jimp = require("jimp");

const app = express();
const PORT = 4000;
const PORT_REMOTE = 3000;

app.get("/screenshot", async (req, res) => {
  const targetUrl = `http://site:${PORT_REMOTE}`;
  let browser;

  try {
    browser = await chromium.launch();
    const context = await browser.newContext({
      viewport: { width: 1280, height: 720 },
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
