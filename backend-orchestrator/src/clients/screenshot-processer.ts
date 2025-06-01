import { config } from "../config/config.js";
import { toQueryParamString } from "../helpers/to-query-params.js";
import type { ScreenshotProcesserQuery } from "../schemas/screenshot-processer-query-schema.js";

export const processScreenshot = async (
  screenshot: ArrayBuffer,
  params: ScreenshotProcesserQuery
): Promise<Blob> => {
  const query = toQueryParamString(params);

  const formData = new FormData();

  const mimeType = `image/${config.PHOTO_REQUEST_FORMAT}`;

  formData.append(
    "file",
    new Blob([screenshot], { type: mimeType }),
    "screenshot." + config.PHOTO_REQUEST_FORMAT
  );

  // Send POST request to FastAPI endpoint with query parameters
  const response = await fetch(`http://screenshot-processer:4002/?${query}`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  // Assuming the response is an image stream, return the Blob
  const resultBlob = await response.blob();

  return resultBlob;
};
