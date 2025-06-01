import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { BackendOrchestratorQuerySchema } from "./schemas/backend-orchestrator-query-schema.js";
import { getWebsitePageScreenshot } from "./clients/screenshot-taker.js";
import { processScreenshot } from "./clients/screenshot-processer.js";

const app = new Hono();

app.all("*", zValidator("query", BackendOrchestratorQuerySchema), async (c) => {
  const path = c.req.path;
  const queryParams = c.req.valid("query");

  const websiteImage = await getWebsitePageScreenshot(path, queryParams);
  const processedImage = await processScreenshot(websiteImage, queryParams);

  return new Response(processedImage, {
    headers: {
      "Content-Type": `image/${queryParams.format}`,
    },
  });
});

export default app;
