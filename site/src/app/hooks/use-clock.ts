"use client";
import useSWR from "swr";

export type UseClockProps = {
  refreshInMs: number;
};

const useClock = ({ refreshInMs }: UseClockProps): Date => {
  const key = `clock-${refreshInMs}`;

  const { data: time } = useSWR<Date>(key, () => new Date(), {
    refreshInterval: refreshInMs,
    dedupingInterval: refreshInMs,
    fallbackData: new Date(),
  });

  return time ?? new Date();
};

export default useClock;
