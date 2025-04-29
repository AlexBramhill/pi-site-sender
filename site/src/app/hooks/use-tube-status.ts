"use client";
import { useEffect, useState } from "react";

// TODO: These types are an absolute crime, and should be revisited
// Only added to get it building for testing purposes

type UseTubeStatusResult = {
  data: lineStatus | null;
  loading: boolean;
  error: string | null;
};

type lineStatus = {
  name: string;
  lineStatuses: [{ statusSeverity: string; statusSeverityDescription: string }];
};

export function useTubeStatus(lineId: string): UseTubeStatusResult {
  const [data, setData] = useState<lineStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!lineId) return;

    const fetchStatus = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/tube?lineId=${lineId}`);
        if (!res.ok) throw new Error("Failed to fetch line status");
        const result = await res.json();
        setData(result);
      } catch (err: unknown) {
        console.error("Tube status error:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();

    const intervalId = setInterval(fetchStatus, 60000); // Update every minute

    return () => clearInterval(intervalId); // Cleanup on unmount or lineId change
  }, [lineId]);

  return { data, loading, error };
}
