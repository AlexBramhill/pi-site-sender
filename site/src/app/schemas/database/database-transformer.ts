import { DtoSchema } from "../Dto";
import { SqlRawSchema } from "./sql-raw";

export const SqlToModelTransformer = SqlRawSchema.transform((row) => {
  const isSuccess = row.is_success === 0;

  const base = {
    fetchedAt: new Date(row.fetched_at),
    isSuccess,
  };

  if (isSuccess) {
    return {
      ...base,
      data: row.data ? JSON.parse(row.data) : undefined,
    };
  } else {
    return {
      ...base,
      error: row.error ?? "Unknown error",
    };
  }
}).pipe(DtoSchema);

export const DtoToSqlTransformer = DtoSchema.transform((model) => {
  return {
    fetched_at: model.fetchedAt.toISOString(),
    is_success: model.isSuccess ? 0 : 1,
    data:
      model.isSuccess && model.data !== undefined
        ? JSON.stringify(model.data)
        : null,
    error: !model.isSuccess ? model.error : null,
  };
});
