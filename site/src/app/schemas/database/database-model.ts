import { z, ZodType } from "zod";
import { LineStatusSchema } from "../line-status";

// Abstract base schemas
const BaseModelSchema = z.object({
  fetchedAt: z.date(),
  isSuccess: z.boolean(),
});

export const FailureModelSchema = BaseModelSchema.extend({
  isSuccess: z.literal(false),
  error: z.string(),
});

export const SuccessModelSchema = BaseModelSchema.extend({
  isSuccess: z.literal(true),
  data: z.unknown(),
});

export const ModelSchema = z.union([SuccessModelSchema, FailureModelSchema]);

export type SuccessModel<T = unknown> = z.infer<typeof SuccessModelSchema> & {
  data: T;
};
export type FailureModel = z.infer<typeof FailureModelSchema>;
export type Model<T = unknown> = SuccessModel<T> | FailureModel;

export const GetSuccessModelSchema = <T>(
  schema: ZodType<T>
): ZodType<SuccessModel<T>> =>
  SuccessModelSchema.extend({
    data: schema,
  }) as ZodType<SuccessModel<T>>;
