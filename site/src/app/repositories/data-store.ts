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
  private readonly tableName: TableName;
  private readonly modelSchema: ZodType<SuccessModel<T>>;

  constructor({
    tableName,
    schema,
  }: {
    tableName: TableName;
    schema: ZodType<T>;
  }) {
    this.tableName = tableName;
    this.modelSchema = GetSuccessModelSchema(schema);
  }

  save = (dataModel: SuccessModel<T>) => {
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

  getLatest = (): Model<T> => {
    const getLatestTubeData = db.prepare(`
      SELECT * FROM ${this.tableName} ORDER BY last_fetched DESC LIMIT 1
    `);

    const row = getLatestTubeData.get();

    if (!row) {
      throw new Error(`No data found in table ${this.tableName}`);
    }

    const parsedRow = SqlToModelTransformer.parse(row);

    if (!parsedRow.isSuccess) {
      return parsedRow;
    }

    return this.modelSchema.parse(parsedRow);
  };

  getLatestSuccess = (): SuccessModel<T> => {
    const getLatestTubeData = db.prepare(`
      SELECT * FROM ${this.tableName} WHERE is_success = 1 ORDER BY last_fetched DESC LIMIT 1
    `);

    const row = getLatestTubeData.get();

    if (!row) {
      throw new Error("No successful tube data found");
    }

    return this.modelSchema.parse(SqlToModelTransformer.parse(row));
  };

  getLatestFailure = (): FailureModel => {
    const getLatestTubeData = db.prepare(`
      SELECT * FROM ${this.tableName} WHERE is_success = 0 ORDER BY last_fetched DESC LIMIT 1
    `);

    const row = getLatestTubeData.get();

    if (!row) {
      throw new Error("No successful tube data found");
    }

    return SqlToModelTransformer.parse(row) as FailureModel;
  };
}
