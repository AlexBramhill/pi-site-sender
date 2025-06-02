import { ScreenshotFormat } from "../schemas/screenshot-format-schema.js";

export const getContentTypeForScreenshotFormat = (
  format: ScreenshotFormat
): string => {
  if (format == ScreenshotFormat.bmp_raw) {
    return "application/octet-stream";
  }
  return `image/${format}`;
};
