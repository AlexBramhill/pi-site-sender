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

export const LineStatusFailureModelSchema = z.object({
  fetchedAt: z.date(),
  isSuccess: z.literal(false),
});
export const LineStatusSuccessModelSchema = z.object({
  fetchedAt: z.date(),
  isSuccess: z.literal(true),
  lineStatus: LineStatusSchema.array(),
});

export type LineStatus = z.infer<typeof LineStatusSchema>;
export type LineStatusSuccessModel = z.infer<
  typeof LineStatusSuccessModelSchema
>;
export type LineStatusFailureModel = z.infer<
  typeof LineStatusFailureModelSchema
>;
