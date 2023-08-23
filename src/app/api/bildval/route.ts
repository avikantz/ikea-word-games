import { NextResponse } from "next/server";

import { IKEAProduct } from "@/interfaces";

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

  const list: string[] = require(`../list/unique/${length}.json`);
  const itemMap: Record<string, IKEAProduct> = require("../items/map.json");

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
