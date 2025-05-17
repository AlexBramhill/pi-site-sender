import { FailureDto, Dto, SuccessDto, parseDto } from "../schemas/Dto";
import { ZodType } from "zod";
import { IDataStore } from "./database-store";
import redisClient from "./database_init";

export class RedisDatastore<T> implements IDataStore<T> {
  private readonly schema: ZodType<T>;
  private readonly cacheKey: string;
  private readonly ttlSeconds: number;

  constructor(
    cacheKey: string,
    schema: ZodType<T>,
    ttlSeconds: number = 15 * 60
  ) {
    this.cacheKey = cacheKey;
    this.schema = schema;
    this.ttlSeconds = ttlSeconds;
  }

  async save(dataModel: Dto<T>): Promise<void> {
    const dataString = JSON.stringify(dataModel);
    await redisClient.set(this.cacheKey, dataString, {
      EX: this.ttlSeconds,
    });
  }

  async getLatest(): Promise<Dto<T> | null> {
    const dataString = await redisClient.get(this.cacheKey);
    if (!dataString) return null;

    let parsed: unknown;

    try {
      parsed = JSON.parse(dataString);
    } catch {
      return null;
    }

    if (parsed === null) {
      return null;
    }

    return parseDto(this.schema, parsed);
  }

  // Get latest successful DTO
  async getLatestSuccess(): Promise<SuccessDto<T> | null> {
    const latest = await this.getLatest();
    if (latest && latest.isSuccess) {
      return latest as SuccessDto<T>;
    }
    return null;
  }

  // Get latest failure DTO
  async getLatestFailure(): Promise<FailureDto | null> {
    const latest = await this.getLatest();
    if (latest && !latest.isSuccess) {
      return latest as FailureDto;
    }
    return null;
  }
}
