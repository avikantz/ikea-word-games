import { NextResponse } from "next/server";

import { IKEAProduct } from "@/interfaces";

const itemMap: Record<string, IKEAProduct> = require("./map.json");

export async function GET(request: Request) {
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
