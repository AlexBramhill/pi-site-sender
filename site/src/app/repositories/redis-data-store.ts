import { FailureDto, Dto, SuccessDto, parseDto } from "../schemas/Dto";
import { ZodType } from "zod";
import { IDataStore } from "./database-store";
import redisClient from "./database_init";

export class RedisDatastore<TSchema, TParams = unknown>
  implements IDataStore<TSchema>
{
  private readonly schema: ZodType<TSchema>;
  private readonly cacheKey: string;
  private readonly ttlSeconds: number;

  constructor(
    cacheKey: string,
    schema: ZodType<TSchema>,
    ttlSeconds: number = 15 * 60
  ) {
    this.cacheKey = cacheKey;
    this.schema = schema;
    this.ttlSeconds = ttlSeconds;
  }

  private generateCacheKey(params: TParams): string {
    if (
      params === undefined ||
      params === null ||
      (Array.isArray(params) && params.length === 0) ||
      (typeof params === "object" &&
        !Array.isArray(params) &&
        Object.keys(params).length === 0)
    ) {
      return `${this.cacheKey}:no-query`;
    }

    let paramKey: string;
    paramKey =
      typeof params === "object"
        ? JSON.stringify(params, Object.keys(params).sort())
        : String(params);

    return `${this.cacheKey}:${paramKey}`;
  }

  async save(dataModel: Dto<TSchema>, requestParams: TParams): Promise<void> {
    const key = this.generateCacheKey(requestParams);
    const dataString = JSON.stringify(dataModel);
    await redisClient.set(key, dataString, {
      EX: this.ttlSeconds,
    });
  }

  async getLatest(requestParams: TParams): Promise<Dto<TSchema> | null> {
    const key = this.generateCacheKey(requestParams);
    const dataString = await redisClient.get(key);
    if (!dataString) return null;

    try {
      const parsed = JSON.parse(dataString);
      return parsed ? parseDto(this.schema, parsed) : null;
    } catch {
      return null;
    }
  }

  async getLatestSuccess(
    requestParams: TParams
  ): Promise<SuccessDto<TSchema> | null> {
    const latest = await this.getLatest(requestParams);
    return latest?.isSuccess ? (latest as SuccessDto<TSchema>) : null;
  }

  async getLatestFailure(requestParams: TParams): Promise<FailureDto | null> {
    const latest = await this.getLatest(requestParams);
    return latest && !latest.isSuccess ? (latest as FailureDto) : null;
  }
}
