import express, { Request, Response } from "express";
import { takeScreenshot } from "./website-interface";

const app = express();
const PORT = 4000;
const PORT_REMOTE = 3000;

app.get("/", async (req: Request, res: Response) => {
  const targetUrl = `http://site:${PORT_REMOTE}`;
  const width = parseInt(req.query.width as string) || 1280;
  const height = parseInt(req.query.height as string) || 720;

  const screenshotBuffer = await takeScreenshot({ targetUrl, width, height });

  res.set("Content-Type", "image/png");
  res.send(screenshotBuffer);
});

app.listen(PORT, () => {
  console.log(
    `${process.env.NODE_ENV} server running at http://localhost:${PORT}`
  );
});
