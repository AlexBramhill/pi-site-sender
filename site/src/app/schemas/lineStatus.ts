import { z } from "zod";

export const LineStatusSchema = z.object({
  id: z.string(),
  name: z.string(),
  lineStatuses: z.array(
    z.object({
      statusSeverity: z.number(),
      statusSeverityDescription: z.string(),
    })
  ),
});

export type LineStatus = z.infer<typeof LineStatusSchema>;
