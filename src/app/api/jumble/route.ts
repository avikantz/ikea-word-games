import { NextResponse } from "next/server";

const DEFAULT_LENGTH = 5; // Number of letters in word

export async function GET(request: Request) {
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

  const list = require(`../list/unique/${length}.json`);
  const itemMap = require('../list/item-map.json');

  // Get random word from unique item list
  const randomWord = list[Math.floor(Math.random() * list.length)];
  
  const response = {
	word: randomWord,
	data: itemMap[randomWord]
  }

  // TODO: encrypt response
  return NextResponse.json(response);
}
