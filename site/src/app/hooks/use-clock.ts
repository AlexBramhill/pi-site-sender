"use client";
import useSWR from "swr";
import { ONE_SECOND_IN_MS } from "../consts/time";

const useClock = (): Date | null => {
  const refreshInMs = ONE_SECOND_IN_MS;

  const key = `clock-${refreshInMs}`;

  const { data: time } = useSWR<Date>(key, () => new Date(), {
    refreshInterval: refreshInMs,
    dedupingInterval: refreshInMs,
    fallbackData: new Date(),
  });

  return time ?? null;
};

export default useClock;
