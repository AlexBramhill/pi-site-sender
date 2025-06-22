import { FIFTEEN_MINUTES_IN_MS } from "../consts/time";
import { RedisDatastore } from "../repositories/redis-data-store";
import { Dto, SuccessDto, FailureDto } from "../schemas/Dto";

export class DataRetrieverService<
  TResponse,
  TRequestParams extends unknown[] = []
> {
  constructor(
    private readonly datastore: RedisDatastore<TResponse, TRequestParams>,
    private readonly debounceTimeForSuccess: number = FIFTEEN_MINUTES_IN_MS,
    private readonly debounceTimeForFailure: number = FIFTEEN_MINUTES_IN_MS,
    private readonly makeClientRequest: (
      ...args: TRequestParams
    ) => Promise<TResponse>
  ) {}

  async getData(...args: TRequestParams): Promise<Dto<TResponse> | null> {
    const now = new Date();
    const debounceTimeForSuccess = new Date(
      now.getTime() - this.debounceTimeForSuccess
    );
    const debounceTimeForFailure = new Date(
      now.getTime() - this.debounceTimeForFailure
    );

    const latestDataFromDatabase = await this.datastore.getLatest(args);

    if (
      latestDataFromDatabase &&
      latestDataFromDatabase.fetchedAt >=
        (latestDataFromDatabase.isSuccess
          ? debounceTimeForSuccess
          : debounceTimeForFailure)
    ) {
      return latestDataFromDatabase;
    }

    try {
      const newData = await this.makeClientRequest(...args);

      const newModel: SuccessDto<TResponse> = {
        fetchedAt: now,
        data: newData,
        isSuccess: true,
      };

      await this.datastore.save(newModel, args);
      return newModel;
    } catch (error) {
      const errorModel: FailureDto = {
        fetchedAt: now,
        isSuccess: false,
        error: String(error),
      };

      await this.datastore.save(errorModel, args);
      return errorModel;
    }
  }
}
