export const extractQueryParams = (searchParams: URLSearchParams) => {
  const params: { [key: string]: unknown } = {};

  for (const [key, value] of searchParams.entries()) {
    params[key] = value;
  }

  return params;
};
