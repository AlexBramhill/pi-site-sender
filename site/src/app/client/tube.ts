import { config } from "@/app/config/config";
import { LineStatus, LineStatusSchema } from "@/app/schemas/line-status";

export const getLineStatus = async (lineId: string): Promise<LineStatus> => {
  
  const params = new URLSearchParams({ app_key: config.TFL_API_KEY });

  const response = await fetch(
    `https://api.tfl.gov.uk:443/Line/${lineId}/Status?${params}`
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return parseLineStatus(data)[0];
};

const parseLineStatus = (lineStatus: unknown): LineStatus[] => {
  return LineStatusSchema.array().parse(lineStatus);
};
