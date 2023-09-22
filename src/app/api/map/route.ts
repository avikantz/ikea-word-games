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

  const itemMapPath = join(process.cwd(), "src", "data", lang, "items", "map.json");
  const itemMap: Record<string, IKEAProduct> = JSON.parse(readFileSync(itemMapPath, { encoding: "utf8" }));

  return NextResponse.json(itemMap);
}
