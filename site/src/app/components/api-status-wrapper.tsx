import { UseApiResult } from "../hooks/use-api";
import { SuccessDto } from "../schemas/Dto";

type ApiStatusWrapperProps<T> = {
  children: (data: SuccessDto<T>) => React.ReactNode;
  className?: string;
  apiResult: UseApiResult<T>;
};

export function ApiStatusWrapper<T>({
  apiResult,
  children,
  className = "",
}: ApiStatusWrapperProps<T>) {
  const { dto, isLoading } = apiResult;

  if (isLoading) return <div className={className}>Loading...</div>;
  if (!dto) return <div className={className}>No data found</div>;
  if (dto.isSuccess === false)
    return <div className={className}>Error: {dto.error}</div>;
  return <div className={className}>{children(dto)}</div>;
}

export default ApiStatusWrapper;
