export type ApiUrl = string;

export const toApiUrl = (
  path: string,
  queryParams?: Record<string, string | number | boolean | undefined>
): ApiUrl => {
  const apiPath = `/api${path}`;

  if (!queryParams) {
    return apiPath;
  }

  const queryString = Object.entries(queryParams)
    .filter(([, value]) => value !== undefined)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
    )
    .join("&");

  return `${apiPath}?${queryString}`;
};
