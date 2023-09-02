import { QueryFunction } from "@tanstack/react-query";

import { GAME_MODE } from "@/interfaces";
import { BASE_URL } from "@/utils/constants";

export const Q_UNIQUE_KEY = "q_unique";

export interface UniqueQuery {
  length?: number;
  mode?: GAME_MODE;
}

export const fetchUnique: QueryFunction<any, [string, UniqueQuery]> = async ({ queryKey }) => {
  const [_key, { mode, length }] = queryKey;

  // Get from local storage if available
  const lsKey = `${Q_UNIQUE_KEY}_${mode || length || "all"}`;
  if (typeof window !== "undefined") {
    const list = window.localStorage.getItem(lsKey);
    if (list) {
      return JSON.parse(list);
    }
  }

  const url = new URL("/api/list/unique", BASE_URL);

  if (mode) {
    url.searchParams.append("mode", mode);
  } else if (length) {
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
