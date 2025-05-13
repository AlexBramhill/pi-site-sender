import { z } from "zod";

export const SqlRawSchema = z.object({
  fetched_at: z.string(),
  is_success: z.union([z.literal(0), z.literal(1)]),
  data: z.string().nullable(),
  error: z.string().nullable(),
});
