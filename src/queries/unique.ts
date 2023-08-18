import { QueryFunction } from "@tanstack/react-query";

interface UniqueQuery {
  length?: number;
}

export const fetchUnique: QueryFunction<any, [string, UniqueQuery]> = async ({ queryKey }) => {
  const [_key, { length }] = queryKey;

  const url = new URL("/api/list/unique");

  if (length) {
    url.searchParams.append('length', length.toString())
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};
