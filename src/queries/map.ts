import i18next from "i18next";
import { QueryFunction } from "@tanstack/react-query";

export const Q_MAP_KEY = "q_map";

export const fetchMap: QueryFunction = async ({ queryKey }) => {
  const [_key] = queryKey;

  const storageKey = `${i18next.language}_${Q_MAP_KEY}`;

  // Get from local storage if available
  if (typeof window !== "undefined") {
    const map = window.localStorage.getItem(storageKey);
    if (map) {
      return JSON.parse(map);
    }
  }

  const response = await fetch("/api/map", { cache: "no-store" });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  // Save to local storage
  if (typeof window !== "undefined") {
    const map = await response.text();
    window.localStorage.setItem(storageKey, map);
  }

  return response.json();
};
