import { QueryFunction } from "@tanstack/react-query";

import { BASE_URL } from "@/utils/constants";

interface ItemsQuery {
  words: string | string[];
}

export const fetchItems: QueryFunction<any, [string, ItemsQuery]> = async ({ queryKey }) => {
  const [_key, { words }] = queryKey;

  const url = new URL("/api/items", BASE_URL);

  if (typeof words === "string") {
    url.searchParams.append("words", words);
  } else if (Array.isArray(words)) {
    words.forEach((word) => url.searchParams.append("words", word));
  }

  const response = await fetch(url, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};
