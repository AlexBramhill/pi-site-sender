import { z, ZodType } from "zod";
import { LineStatusClientResponseSchema } from "./line-status";

const BaseDtoSchema = z.object({
  fetchedAt: z.date(),
  isSuccess: z.boolean(),
});

export const FailureDtoSchema = BaseDtoSchema.extend({
  isSuccess: z.literal(false),
  error: z.string(),
});

export const SuccessDtoSchema = BaseDtoSchema.extend({
  isSuccess: z.literal(true),
  data: z.unknown(),
});

export const DtoSchema = z.union([SuccessDtoSchema, FailureDtoSchema]);

export type SuccessDto<T = unknown> = z.infer<typeof SuccessDtoSchema> & {
  data: T;
};

export type FailureDto = z.infer<typeof FailureDtoSchema>;
export type Dto<T = unknown> = SuccessDto<T> | FailureDto;

export const getSuccessDtoSchema = <T>(
  schema: ZodType<T>
): ZodType<SuccessDto<T>> =>
  SuccessDtoSchema.extend({
    data: schema,
  }) as ZodType<SuccessDto<T>>;

export function assertDto<T>(
  schema: ZodType<T>,
  dto: unknown
): asserts dto is Dto<T> {
  const successDtoSchema = getSuccessDtoSchema(schema);
  const testSchema = z.union([successDtoSchema, FailureDtoSchema]);
  testSchema.parse(dto);
}
