import { QueryFunction } from "@tanstack/react-query";

export interface NameQuery {
  length?: number;
}

export const fetchNames: QueryFunction<any, [string, NameQuery]> = async ({
  queryKey,
}) => {
  const [_key, { length }] = queryKey;

  const url = new URL("/api/list/names");

  if (length) {
    url.searchParams.append("length", length.toString());
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};
