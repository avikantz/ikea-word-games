import { QueryFunction } from "@tanstack/react-query";

export const Q_UNIQUE_KEY = "q_unique";

export interface UniqueQuery {
  length?: number;
}

export const fetchUnique: QueryFunction<any, [string, UniqueQuery]> = async ({
  queryKey,
}) => {
  const [_key, { length }] = queryKey;

  // Get from local storage if available
  if (typeof window !== "undefined") {
    const list = window.localStorage.getItem(`${Q_UNIQUE_KEY}_${length}`);
    if (list) {
      return JSON.parse(list);
    }
  }

  const url = new URL("/api/list/unique", window.location.origin);

  if (length) {
    url.searchParams.append("length", length.toString());
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  // Save to local storage
  if (typeof window !== "undefined") {
    const list = await response.text();
    window.localStorage.setItem(`${Q_UNIQUE_KEY}_${length}`, list);
  }

  return response.json();
};
