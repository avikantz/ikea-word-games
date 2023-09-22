import { QueryFunction } from "@tanstack/react-query";
import i18next from "i18next";

export const Q_NAMES_KEY = "q_names";

export interface NameQuery {
  length?: number;
}

export const fetchNames: QueryFunction<any, [string, NameQuery]> = async ({ queryKey }) => {
  const [_key, { length }] = queryKey;

  // Get from local storage if available
  const storageKey = `${i18next.language}_${Q_NAMES_KEY}_${length || "all"}`;

  if (typeof window !== "undefined") {
    const list = window.localStorage.getItem(storageKey);
    if (list) {
      return JSON.parse(list);
    }
  }

  // Default file
  let fileName = "all";
  if (length && length >= 4 && length <= 10) {
    // Fix length between 4 and 10
    fileName = length.toString();
  }

  // const url = new URL("/api/list/names", window.location.origin);

  // if (length) {
  //   url.searchParams.append("length", length.toString());
  // }

  const response = await fetch(`/data/${i18next.language ?? "en"}/names/${fileName}.json`);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  // Save to local storage
  if (typeof window !== "undefined") {
    const list = await response.text();
    window.localStorage.setItem(storageKey, list);
  }

  return await response.json();
};
