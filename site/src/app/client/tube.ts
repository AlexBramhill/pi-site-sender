import { config } from "@/app/config/config";
import {
  LineStatusClientResponse,
  LineStatusClientResponseSchema,
} from "@/app/schemas/line-status";
import { GetPlannedJourneyRequestQuery } from "../schemas/planned-journey-request";

export const getLineStatus = async (
  lineId: string
): Promise<LineStatusClientResponse> => {
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

const parseLineStatus = (lineStatus: unknown): LineStatusClientResponse[] => {
  return LineStatusClientResponseSchema.array().parse(lineStatus);
};

export const getPlannedJourney = async ({
  to,
  from,
  toName,
  fromName,
  dateTime,
}: GetPlannedJourneyRequestQuery) => {
  const baseUrl = "https://api.digital.tfl.gov.uk/Journey/JourneyResults/";

  const params = new URLSearchParams({
    nationalSearch: "false",
    date: dateTime
      ? dateTime.split(" ")[0]
      : new Date().toISOString().split("T")[0],
    time: dateTime
      ? dateTime.split(" ")[1]
      : new Date().toTimeString().split(" ")[0],
    timeIs: "Arriving",
    fromName: fromName ?? "",
    toName: toName ?? "",
    walkingSpeed: "Fast",
    useRealTimeLiveArrivals: "true",
    combineTransferLegs: "false",
    app_key: config.TFL_API_KEY,
  });

  const response = await fetch(
    `${baseUrl}${encodeURIComponent(from)}/to/${encodeURIComponent(
      to
    )}?${params.toString()}`
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch journey data: ${response.statusText}`);
  }
  const data = await response.json();
  return data;
};
// https://api.tfl.gov.uk/Journey/JourneyResults/51%2C-0/to/51%2C-0?nationalSearch=false&date=20250611&time=1100&timeIs=Arriving&fromName=Home&toName=Work&walkingSpeed=Fast&useRealTimeLiveArrivals=true&combineTransferLegs=true
