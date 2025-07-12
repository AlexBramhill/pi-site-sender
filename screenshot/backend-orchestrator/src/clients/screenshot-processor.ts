import { config } from "../config/config.js";
import { toQueryParamString } from "../helpers/to-query-params.js";
import type { ScreenshotProcessorQuery } from "../schemas/screenshot-processor-query-schema.js";

export const processScreenshot = async (
  screenshot: ArrayBuffer,
  params: ScreenshotProcessorQuery
): Promise<Uint8Array> => {
  const query = toQueryParamString(params);

  const formData = new FormData();

  const mimeType = `image/${params.format}`;

  formData.append(
    "file",
    new Blob([screenshot], { type: mimeType }),
    "screenshot." + params.format
  );

  const response = await fetch(`http://screenshot-processor:4002/?${query}`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  const arrayBuffer = await response.arrayBuffer();

  return new Uint8Array(arrayBuffer);
};
