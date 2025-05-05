import express, { Request, Response } from "express";
import { takeScreenshot } from "./website-interface";
import { ScreenshotQuery, ScreenshotQuerySchema } from "./schemas/query-schema";

const app = express();
const PORT = 4000;

app.get("/", async (req: Request<ScreenshotQuery>, res: Response) => {
  const parsedQuery = ScreenshotQuerySchema.parse(req.query);

  const screenshotBuffer = await takeScreenshot(parsedQuery);

  res.set("Content-Type", `image/${parsedQuery.format}`);
  res.send(screenshotBuffer);
});

app.listen(PORT, () => {
  console.log(
    `${process.env.NODE_ENV} server running at http://localhost:${PORT}`
  );
});
