import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // Default file
  let fileName = "all";

  const mode = searchParams.get("mode");
  const lengthParam = searchParams.get("length");

  if (mode && ["easy", "medium", "hard"].includes(mode)) {
    fileName = mode;
  } else if (lengthParam) {
    try {
      const length = Number(lengthParam);
      // Fix length between 4 and 10
      if (length < 4 || length > 11) {
        fileName = "all";
      } else {
        fileName = length.toString();
      }
    } catch (error) {
      fileName = "all";
    }
  }

  const list = require(`./${fileName}.json`);

  return NextResponse.json(list);
}
