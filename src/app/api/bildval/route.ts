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

  const listPath = join(process.cwd(), "src", "data", lang, "unique", `${length}.json`);
  const list = JSON.parse(readFileSync(listPath, { encoding: "utf8" }));

  const itemMapPath = join(process.cwd(), "src", "data", lang, "items", "map.json");
  const itemMap: Record<string, IKEAProduct> = JSON.parse(readFileSync(itemMapPath, { encoding: "utf8" }));

  const solution: string = list[Math.floor(Math.random() * list.length)];
  const guesses: string[] = [];

  // Add 3 random non-solution words to guesses
  while (guesses.length < 3) {
    const guess: string = list[Math.floor(Math.random() * list.length)];
    if (guess !== solution) {
      guesses.push(guess);
    }
  }

  // Add solution to guesses
  guesses.push(solution);

  // Shuffle guesses
  guesses.sort(() => Math.random() - 0.5);

  const data: Record<string, IKEAProduct> = {};

  // Add words from guesses to data
  guesses.forEach((word) => {
    data[word] = itemMap[word];
  });

  const response = {
    solution,
    guesses,
    data,
  };

  return NextResponse.json(response);
}
