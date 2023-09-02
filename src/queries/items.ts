import { QueryFunction } from "@tanstack/react-query";

export const Q_ITEMS_KEY = "q_items";

interface ItemsQuery {
  words: string | string[];
}

export const fetchItems: QueryFunction<any, [string, ItemsQuery]> = async ({
  queryKey,
}) => {
  const [_key, { words }] = queryKey;

  const url = new URL("/api/items", process.env.NEXT_PUBLIC_VERCEL_URL ?? window.location.origin);

  if (typeof words === "string") {
    url.searchParams.append("words", words);
  } else if (Array.isArray(words)) {
    words.forEach((word) => url.searchParams.append("words", word));
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};
