import { NextResponse } from "next/server";

const DEFAULT_MAX_LENGTH = 7; // Length of words to return
const DEFAULT_COUNT = 4; // Number of words to return

export async function GET(request: Request) {
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

  const list = require("../list/unique.json");
  const itemMap = require("../list/item-map.json");

  const wordList = [];
  const wordMap: Record<string, any> = {};

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

  // TODO: encrypt response
  return NextResponse.json(response);
}
