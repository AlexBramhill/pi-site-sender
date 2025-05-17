import { Dto, SuccessDto, FailureDto } from "../schemas/Dto";

export interface IDataStore<T> {
  save(dataModel: Dto<T>): Promise<void>;
  getLatest(): Promise<Dto<T> | null>;
  getLatestSuccess(): Promise<SuccessDto<T> | null>;
  getLatestFailure(): Promise<FailureDto | null>;
}
