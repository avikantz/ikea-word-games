import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { join } from "path";
import { readFileSync } from "fs";

import { IKEAProduct } from "@/interfaces";
import { FALLBACK_LANG, LANGUAGES } from "@/app/i18n/settings";

const DEFAULT_LENGTH = 5; // Number of letters in word

export async function GET(request: Request) {
  const cookieStore = cookies();
  const locale = cookieStore.get("i18next");
  let lang = locale?.value ?? FALLBACK_LANG;
  if (!LANGUAGES.includes(lang)) {
    lang = FALLBACK_LANG;
  }

  const { searchParams } = new URL(request.url);

  // Fix length between 4 and 10
  let length = DEFAULT_LENGTH;
  try {
    length = Number(searchParams.get("length"));
    if (length < 4 || length > 11) {
      length = DEFAULT_LENGTH;
    }
  } catch (error) {
    length = DEFAULT_LENGTH;
  }

  const listPath = join(process.cwd(), "data", lang, "unique", `${length}.json`);
  const list = JSON.parse(readFileSync(listPath, { encoding: "utf8" }));

  const itemMapPath = join(process.cwd(), "data", lang, "items", "map.json");
  const itemMap: Record<string, IKEAProduct> = JSON.parse(readFileSync(itemMapPath, { encoding: "utf8" }));

  // Get random word from unique item list
  const randomWord: string = list[Math.floor(Math.random() * list.length)];

  const response = {
    word: randomWord,
    data: itemMap[randomWord],
  };

  return NextResponse.json(response);
}
