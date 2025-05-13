import { z } from "zod";

export const TABLE_NAMES = ["tube", "weather"] as const;

export const TableNameSchema = z.enum(TABLE_NAMES);

export type TableName = z.infer<typeof TableNameSchema>;
