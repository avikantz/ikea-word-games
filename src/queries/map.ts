import { QueryFunction } from "@tanstack/react-query";

export const fetchMap: QueryFunction = async ({ queryKey }) => {
  const [_key] = queryKey;
  const response = await fetch("/api/map");

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};
