import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { join } from "path";
import { readFileSync } from "fs";

import { IKEAProduct } from "@/interfaces";
import { FALLBACK_LANG, LANGUAGES } from "@/app/i18n/settings";

export async function GET(request: Request) {
  const cookieStore = cookies();
  const locale = cookieStore.get("i18next");
  let lang = locale?.value ?? FALLBACK_LANG;
  if (!LANGUAGES.includes(lang)) {
    lang = FALLBACK_LANG;
  }

  const itemMapPath = join(process.cwd(), "data", lang, "items", "map.json");
  const itemMap: Record<string, IKEAProduct> = JSON.parse(readFileSync(itemMapPath, { encoding: "utf8" }));
  
  const { searchParams } = new URL(request.url);

  // Fix maxLength between 5 and 7
  let words: string[] = [];

  try {
    words = searchParams.getAll("words");
  } catch (error) {
    words = [];
  }

  const wordMap: Record<string, IKEAProduct> = {};

  // Get all items from word map
  for (const word of words) {
    if (word in itemMap) {
      wordMap[word] = itemMap[word];
    }
  }

  const response = {
    words,
    data: wordMap,
  };

  return NextResponse.json(response);
}
