import { NextResponse } from "next/server";

export async function GET(request: Request) {
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

  const list = require(`./${fileName}.json`);

  return NextResponse.json(list);
}
