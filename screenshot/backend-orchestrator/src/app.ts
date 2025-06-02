import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { getWebsitePageScreenshot } from "./clients/screenshot-taker.js";
import { processScreenshot } from "./clients/screenshot-processor.js";
import { getContentTypeForScreenshotFormat } from "./helpers/get-content-type-for-screenshot-format.js";
import { BackendOrchestratorQuerySchema } from "@screenshot/shared";
const app = new Hono();

app.all("*", zValidator("query", BackendOrchestratorQuerySchema), async (c) => {
  const path = c.req.path;
  const queryParams = c.req.valid("query");

  console.log(
    `Received request for path: ${path} with query params: ${JSON.stringify(
      queryParams
    )}`
  );

  const websiteImage = await getWebsitePageScreenshot(path, queryParams);
  const processedImage = await processScreenshot(websiteImage, queryParams);

  return c.body(processedImage, 200, {
    "Content-Type": getContentTypeForScreenshotFormat(queryParams.format),
  });
});

export default app;
