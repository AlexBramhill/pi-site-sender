import { z, ZodType } from "zod";

const BaseDtoSchema = z.object({
  fetchedAt: z.date({ coerce: true }),
  isSuccess: z.boolean({ coerce: true }),
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

export const parseDto = <T>(schema: ZodType<T>, dto: unknown): Dto<T> => {
  const successDtoSchema = getSuccessDtoSchema(schema);
  const testSchema = z.union([successDtoSchema, FailureDtoSchema]);
  return testSchema.parse(dto);
};

export const assertDto = <T>(
  schema: ZodType<T>,
  dto: unknown
): asserts dto is Dto<T> => {
  parseDto(schema, dto);
};
