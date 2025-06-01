import { toQueryParamString } from "../helpers/to-query-params.js";
import type { ScreenshotProcesserQuery } from "../schemas/screenshot-processer-query-schema.js";


export const processScreenshot = async (screenshot: ArrayBuffer, params: ScreenshotProcesserQuery): Promise<any> => {
    const query = toQueryParamString(params);


    //       // Create FormData and append the file
    //   const formData = new FormData()
    //   // Create a Blob from ArrayBuffer, use a generic file name with correct mime type based on format
    //   const mimeTypeMap = {
    //     PNG: 'image/png',
    //     JPG: 'image/jpeg',
    //     BMP: 'image/bmp',
    //   }
    //   const mimeType = mimeTypeMap[params.output_format] || 'application/octet-stream'

    //   formData.append('file', new Blob([screenshot], { type: mimeType }), 'screenshot.' + params.output_format.toLowerCase())

    //   // Send POST request to FastAPI endpoint with query parameters
    //   const response = await fetch(`http://your-api-url/process-image/?${query}`, {
    //     method: 'POST',
    //     body: formData,
    //   })

    //   if (!response.ok) {
    //     throw new Error(`API Error: ${response.statusText}`)
    //   }

    //   // Assuming the response is an image stream, return the Blob
    //   const resultBlob = await response.blob()

    //   return resultBlob

    // TODO: config out this hard coded port
    const response = await fetch(`http://screenshot-processer:4001`, { method: 'POST' });

    if (!response.ok) {
        throw new Error(`Failed to fetch screenshot: ${response.statusText}`);
    }

    return response.arrayBuffer();
};
