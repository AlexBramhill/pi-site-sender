import { Dto, SuccessDto, FailureDto } from "../schemas/Dto";

export interface IDataStore<T, TParams = unknown> {
  save(dataModel: Dto<T>, requestParams: TParams): Promise<void>;
  getLatest(requestParams: TParams): Promise<Dto<T> | null>;
  getLatestSuccess(requestParams: TParams): Promise<SuccessDto<T> | null>;
  getLatestFailure(requestParams: TParams): Promise<FailureDto | null>;
}
