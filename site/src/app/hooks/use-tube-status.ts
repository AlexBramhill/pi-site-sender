"use client";
import useSWR from "swr";
import {
  LineStatusClientResponse,
  LineStatusClientResponseSchema,
} from "../schemas/line-status";

type UseTubeStatusResult = {
  lineStatus: LineStatusClientResponse | undefined;
  isLoading: boolean;
  error: string | null;
};

type UseTubeStatusProps = {
  lineId: string;
  refreshInMs: number;
};

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch line status");
  return LineStatusClientResponseSchema.parse(await res.json());
};

export function useTubeStatus({
  lineId,
  refreshInMs,
}: UseTubeStatusProps): UseTubeStatusResult {
  const { data, error, isLoading } = useSWR<LineStatusClientResponse>(
    lineId ? `/api/tube?lineId=${lineId}` : null,
    fetcher,
    { refreshInterval: refreshInMs }
  );

  return {
    lineStatus: data,
    isLoading: isLoading,
    error: error ? error.message : null,
  };
}
