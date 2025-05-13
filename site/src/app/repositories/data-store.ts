import {
  FailureModel,
  GetSuccessModelSchema,
  Model,
  SuccessModel,
} from "../schemas/database/database-model";
import { TableName } from "../schemas/database/database-table-names";
import {
  ModelToSqlTransformer,
  SqlToModelTransformer,
} from "../schemas/database/database-transformer";
import db from "./database_init";
import { ZodType } from "zod";

export class Datastore<T> {
  private readonly modelSchema: ZodType<SuccessModel<T>>;

  constructor(private readonly tableName: TableName, schema: ZodType<T>) {
    this.modelSchema = GetSuccessModelSchema(schema);
  }

  save = (dataModel: Model<T>) => {
    const sqlData = ModelToSqlTransformer.parse(dataModel);
    const saveData = db.prepare(
      `INSERT INTO ${this.tableName} (fetched_at, is_success, data, error) VALUES (?, ?, ?, ?)`
    );
    saveData.run(
      sqlData.fetched_at,
      sqlData.is_success,
      sqlData.data,
      sqlData.error
    );
  };

  getLatest = (): Model<T> | null => {
    const getLatestTubeData = db.prepare(`
      SELECT * FROM ${this.tableName} ORDER BY last_fetched DESC LIMIT 1
    `);

    const row = getLatestTubeData.get();

    if (!row) {
      return null;
    }

    const parsedRow = SqlToModelTransformer.parse(row);

    if (!parsedRow.isSuccess) {
      return parsedRow;
    }

    return this.modelSchema.parse(parsedRow);
  };

  getLatestSuccess = (): SuccessModel<T> | null => {
    const getLatestTubeData = db.prepare(`
      SELECT * FROM ${this.tableName} WHERE is_success = 1 ORDER BY last_fetched DESC LIMIT 1
    `);

    const row = getLatestTubeData.get();

    return row
      ? this.modelSchema.parse(SqlToModelTransformer.parse(row))
      : null;
  };

  getLatestFailure = (): FailureModel | null => {
    const getLatestTubeData = db.prepare(`
      SELECT * FROM ${this.tableName} WHERE is_success = 0 ORDER BY last_fetched DESC LIMIT 1
    `);

    const row = getLatestTubeData.get();

    return row ? (SqlToModelTransformer.parse(row) as FailureModel) : null;
  };
}
