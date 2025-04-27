import express, { Request, Response } from "express";
import { takeScreenshot } from "./website-interface";
import { validateQuery } from "./middlewares/validate-query";
import { ScreenshotQuery, ScreenshotQuerySchema } from "./schemas/query-schema";

const app = express();
const PORT = 4000;

app.get(
  "/",
  validateQuery(ScreenshotQuerySchema),
  async (req: Request<{}, {}, {}, ScreenshotQuery>, res: Response) => {
    const screenshotBuffer = await takeScreenshot(req.query);

    res.set("Content-Type", "image/jpg");
    res.send(screenshotBuffer);
  }
);

app.listen(PORT, () => {
  console.log(
    `${process.env.NODE_ENV} server running at http://localhost:${PORT}`
  );
});
