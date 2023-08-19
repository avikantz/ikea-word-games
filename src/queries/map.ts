import { QueryFunction } from "@tanstack/react-query";

export const Q_MAP_KEY = "q_map";

export const fetchMap: QueryFunction = async ({ queryKey }) => {
  const [_key] = queryKey;

  // Get from local storage if available
  if (typeof window !== "undefined") {
    const map = window.localStorage.getItem(Q_MAP_KEY);
    if (map) {
      return JSON.parse(map);
    }
  }

  const response = await fetch("/api/map");

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  // Save to local storage
  if (typeof window !== "undefined") {
    const map = await response.text();
    window.localStorage.setItem(Q_MAP_KEY, map);
  }

  return response.json();
};
