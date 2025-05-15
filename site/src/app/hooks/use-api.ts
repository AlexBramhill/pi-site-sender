"use client";
import useSWR from "swr";
import { Dto, parseDto } from "../schemas/Dto";
import { ZodError, ZodType } from "zod";
import { ApiUrl } from "../converters/to-api-url";
import { ONE_MINUTE_IN_MS } from "../consts/time";

export type UseApiResult<T> = {
  isLoading: boolean;
  dto?: Dto<T>;
};

type UseApiProps<T> = {
  apiUrl: ApiUrl;
  refreshInMs?: number;
  schema: ZodType<T>;
};

// Bit of an ugly fetch regarding error handling
const getFetcher = <T>(schema: ZodType<T>) => {
  return async (url: string) => {
    try {
      console.log("Fetching data from API:", url);

      const res = await fetch(url);

      if (!res.ok) {
        throw new Error("Failed to communicate with server");
      }

      const json = await res.json();
      console.log("Fetched data:", json);
      const parsedDto = parseDto(schema, json);

      return parsedDto;
    } catch (error) {
      console.error("Error fetching data:", error);

      if (error instanceof ZodError) {
        return {
          fetchedAt: new Date(),
          isSuccess: false as const,
          error: "Parsing DTO failed",
        };
      }

      if (error instanceof Error) {
        return {
          fetchedAt: new Date(),
          isSuccess: false as const,
          error: error.message,
        };
      }

      return {
        fetchedAt: new Date(),
        isSuccess: false as const,
        error: String(error),
      };
    }
  };
};

export function useApi<T>({
  apiUrl,
  refreshInMs = ONE_MINUTE_IN_MS,
  schema,
}: UseApiProps<T>): UseApiResult<T> {
  const { data: dto, isLoading } = useSWR<Dto<T>>(apiUrl, getFetcher(schema), {
    refreshInterval: refreshInMs,
  });

  return {
    isLoading,
    dto,
  };
}
