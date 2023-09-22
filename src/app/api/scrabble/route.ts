import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { join } from "path";
import { readFileSync } from "fs";

import { IKEAProduct } from "@/interfaces";
import { FALLBACK_LANG, LANGUAGES } from "@/app/i18n/settings";

const DEFAULT_MAX_LENGTH = 7; // Length of words to return
const DEFAULT_COUNT = 4; // Number of words to return

export async function GET(request: Request) {
  const cookieStore = cookies();
  const locale = cookieStore.get("i18next");
  let lang = locale?.value ?? FALLBACK_LANG;
  if (!LANGUAGES.includes(lang)) {
    lang = FALLBACK_LANG;
  }

  const { searchParams } = new URL(request.url);

  // Fix maxLength between 5 and 7
  let maxLength = DEFAULT_MAX_LENGTH;
  try {
    maxLength = Number(searchParams.get("length"));
    if (maxLength < 5 || maxLength > 7) {
      maxLength = DEFAULT_MAX_LENGTH;
    }
  } catch (error) {
    maxLength = DEFAULT_MAX_LENGTH;
  }

  // Get count of words to return
  let count = DEFAULT_COUNT;
  try {
    count = Number(searchParams.get("count"));
    if (count < 3 || count > 6) {
      count = DEFAULT_COUNT;
    }
  } catch (error) {
    count = DEFAULT_COUNT;
  }

  const listPath = join(process.cwd(), "data", lang, "unique", "all.json");
  const list = JSON.parse(readFileSync(listPath, { encoding: "utf8" }));

  const itemMapPath = join(process.cwd(), "data", lang, "items", "map.json");
  const itemMap: Record<string, IKEAProduct> = JSON.parse(readFileSync(itemMapPath, { encoding: "utf8" }));

  const wordList = [];
  const wordMap: Record<string, IKEAProduct> = {};

  // Get "count" random words from list maxing out at "maxLength"
  while (wordList.length < count) {
    const randomWord = list[Math.floor(Math.random() * list.length)];
    if (randomWord.length <= maxLength) {
      wordList.push(randomWord);
      wordMap[randomWord] = itemMap[randomWord];
    }
  }

  const response = {
    words: wordList,
    data: wordMap,
  };

  return NextResponse.json(response);
}
