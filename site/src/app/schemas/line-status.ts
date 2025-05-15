import { z } from "zod";

export const LineStatusClientResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  lineStatuses: z.array(
    z.object({
      statusSeverity: z.number(),
      statusSeverityDescription: z.string(),
    })
  ),
});

// export const LineStatusDtoSuccessSchema
export type LineStatusClientResponse = z.infer<
  typeof LineStatusClientResponseSchema
>;
