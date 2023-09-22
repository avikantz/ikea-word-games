import { QueryFunction } from "@tanstack/react-query";

import { GAME_MODE } from "@/interfaces";
import i18next from "i18next";
import { clearAllLocalesDataExcept } from "@/utils/storage";

export const Q_UNIQUE_KEY = "q_unique";

export interface UniqueQuery {
  length?: number;
  mode?: GAME_MODE;
}

export const fetchUnique: QueryFunction<any, [string, UniqueQuery]> = async ({ queryKey }) => {
  const [_key, { mode, length }] = queryKey;

  // Get from local storage if available
  const storageKey = `${i18next.language}_${Q_UNIQUE_KEY}_${mode || length || "all"}`;

  if (typeof window !== "undefined") {
    const list = window.localStorage.getItem(storageKey);
    if (list) {
      return JSON.parse(list);
    }
  }

  // Default file
  let fileName = "all";
  if (mode && ["easy", "medium", "hard"].includes(mode)) {
    fileName = mode;
  } else if (length && length >= 4 && length <= 10) {
    // Fix length between 4 and 10
    fileName = length.toString();
  }

  const response = await fetch(`/data/${i18next.language ?? "en"}/unique/${fileName}.json`);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  // Save to local storage
  if (typeof window !== "undefined") {
    const list = await response.text();
    try {
      window.localStorage.setItem(storageKey, list);
    } catch (error) {
      console.warn(error);
      clearAllLocalesDataExcept(i18next.language);
    }
  }

  return await response.json();
};
