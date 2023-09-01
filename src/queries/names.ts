import { QueryFunction } from "@tanstack/react-query";

export const Q_NAMES_KEY = "q_names";

export interface NameQuery {
  length?: number;
}

export const fetchNames: QueryFunction<any, [string, NameQuery]> = async ({
  queryKey,
}) => {
  const [_key, { length }] = queryKey;

  // Get from local storage if available
  const lsKey = `${Q_NAMES_KEY}_${length || "all"}`;
  if (typeof window !== "undefined") {
    const list = window.localStorage.getItem(lsKey);
    if (list) {
      return JSON.parse(list);
    }
  }

  const url = new URL("/api/list/names", window.location.origin);

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
    window.localStorage.setItem(lsKey, list);
  }

  return response.json();
};
