export type ApiUrl = string;

export const toApiUrl = (
  path: string,
  queryParams?: Record<string, string | number | boolean | undefined>
): ApiUrl => {
  const apiPath = `/api${path}`;

  if (!queryParams) return apiPath;

  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(queryParams)) {
    if (value !== undefined) {
      params.set(key, String(value));
    }
  }

  const queryString = params.toString();
  return queryString ? `${apiPath}?${queryString}` : apiPath;
};
