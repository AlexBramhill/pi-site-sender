import { FIFTEEN_MINUTES_IN_MS } from "../consts/time";
import { Datastore } from "../repositories/data-store";
import { FailureDto, Dto, SuccessDto } from "../schemas/Dto";

export class DataRetrieverService<T> {
  constructor(
    private readonly datastore: Datastore<T>,
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

    const latestDataFromDatabase = this.datastore.getLatest();

    if (latestDataFromDatabase) {
      if (
        latestDataFromDatabase.fetchedAt >=
        (latestDataFromDatabase.isSuccess
          ? debounceTimeForSuccess
          : debounceTimeForFailure)
      ) {
        return latestDataFromDatabase;
      }
    }

    try {
      const newData = await this.makeClientRequest();

      const newModel: SuccessDto<T> = {
        fetchedAt: now,
        data: newData,
        isSuccess: true,
      };

      this.datastore.save(newModel);

      return newModel;
    } catch (error) {
      const errorModel: FailureDto = {
        fetchedAt: now,
        isSuccess: false,
        error: String(error),
      };

      this.datastore.save(errorModel);
      return errorModel;
    }
  }
}
