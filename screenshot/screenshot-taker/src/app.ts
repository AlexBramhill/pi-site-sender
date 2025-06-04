import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { takeScreenshot } from "./website-interface.js";
import { ScreenshotQuerySchema } from "./schemas/screenshot-query-schema.js";

const app = new Hono();

app.get("/", zValidator("query", ScreenshotQuerySchema), async (c) => {
  const query = c.req.valid("query");

  const screenshotBuffer = await takeScreenshot(query);

  console.log("Screenshot buffer length:", screenshotBuffer.length);
  c.header("Content-Type", `image/${query.format}`);
  return c.body(screenshotBuffer, 200, {
    "Content-Type": `image/${query.format}`,
  });
});

export default app;
