import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { join } from "path";
import { readFileSync } from "fs";

import { FALLBACK_LANG, LANGUAGES } from "@/app/i18n/settings";

export async function GET(request: Request) {
  const cookieStore = cookies();
  const locale = cookieStore.get("i18next");
  let lang = locale?.value ?? FALLBACK_LANG;
  if (!LANGUAGES.includes(lang)) {
    lang = FALLBACK_LANG;
  }

  const { searchParams } = new URL(request.url);

  // Fix length between 4 and 10
  let fileName = "all";
  try {
    const length = Number(searchParams.get("length"));
    if (length < 4 || length > 11) {
      fileName = "all";
    } else {
		fileName = length.toString();
	}
  } catch (error) {
	fileName = "all";
  }

  const listPath = join(process.cwd(), "data", lang, "names", `${length}.json`);
  const list = JSON.parse(readFileSync(listPath, { encoding: "utf8" }));

  return NextResponse.json(list);
}
