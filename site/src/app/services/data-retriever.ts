import { ZodType } from "zod";
import { FIFTEEN_MINUTES_IN_MS } from "../consts/time";
import { Datastore } from "../repositories/data-store";
import {
  FailureModel,
  Model,
  SuccessModel,
} from "../schemas/database/database-model";

export class DataRetrieverService<T> {
  constructor(
    private readonly datastore: Datastore<T>,
    private readonly debounceTimeForSuccess: number = FIFTEEN_MINUTES_IN_MS,
    private readonly debounceTimeForFailure: number = FIFTEEN_MINUTES_IN_MS,
    private readonly makeClientRequest: () => Promise<T>
  ) {}

  async getData(): Promise<Model<T> | null> {
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

      const newModel: SuccessModel<T> = {
        fetchedAt: now,
        data: newData,
        isSuccess: true,
      };

      this.datastore.save(newModel);

      return newModel;
    } catch (error) {
      const errorModel: FailureModel = {
        fetchedAt: now,
        isSuccess: false,
        error: String(error),
      };

      this.datastore.save(errorModel);
      return errorModel;
    }
  }
}
