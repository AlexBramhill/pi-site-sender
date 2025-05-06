"use client";
import useSWR from "swr";
import { LineStatus } from "../schemas/line-status";

type UseTubeStatusResult = {
  lineStatus: LineStatus | null;
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
  return res.json();
};

export function useTubeStatus({
  lineId,
  refreshInMs,
}: UseTubeStatusProps): UseTubeStatusResult {
  const { data, error, isLoading } = useSWR<LineStatus>(
    lineId ? `/api/tube?lineId=${lineId}` : null,
    fetcher,
    { refreshInterval: refreshInMs }
  );

  return {
    lineStatus: data || null,
    isLoading: isLoading,
    error: error ? error.message : null,
  };
}
