import { FIFTEEN_MINUTES_IN_MS } from "../consts/time";
import { RedisDatastore } from "../repositories/redis-data-store";
import { Dto, SuccessDto, FailureDto } from "../schemas/Dto";

export class DataRetrieverService<T> {
  constructor(
    private readonly datastore: RedisDatastore<T>,
    private readonly debounceTimeForSuccess: number = FIFTEEN_MINUTES_IN_MS,
    private readonly debounceTimeForFailure: number = FIFTEEN_MINUTES_IN_MS,
    private readonly makeClientRequest: () => Promise<T>
  ) {}

  async getData(): Promise<Dto<T> | null> {
    const now = new Date();
    const debounceTimeForSuccess = new Date(
      now.getTime() - this.debounceTimeForSuccess
    );
    const debounceTimeForFailure = new Date(
      now.getTime() - this.debounceTimeForFailure
    );

    const latestDataFromDatabase = await this.datastore.getLatest();

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
      const newData = await this.makeClientRequest();

      const newModel: SuccessDto<T> = {
        fetchedAt: now,
        data: newData,
        isSuccess: true,
      };

      await this.datastore.save(newModel);

      return newModel;
    } catch (error) {
      const errorModel: FailureDto = {
        fetchedAt: now,
        isSuccess: false,
        error: String(error),
      };

      await this.datastore.save(errorModel);
      return errorModel;
    }
  }
}
