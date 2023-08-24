import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";

import { Q_MAP_KEY, Q_UNIQUE_KEY, UniqueQuery, fetchMap, fetchUnique } from "@/queries";
import { BildvalRound, IKEAProduct, GAME_MODE } from "@/interfaces";

interface UseBildvalProps {
  length?: number;
  mode?: GAME_MODE;
}

type BildvalRoundFunction = () => BildvalRound | undefined;

export const useBildval = ({ length, mode }: UseBildvalProps) => {
  // Map of names to IKEA products
  const { data: ikeaMap } = useQuery<unknown, unknown, Record<string, IKEAProduct>>([Q_MAP_KEY], fetchMap);

  // List of unique IKEA product names
  const { data: list } = useQuery<unknown, unknown, string[], [string, UniqueQuery]>(
    [Q_UNIQUE_KEY, { length, mode }],
    fetchUnique,
  );

  const getBildvalRound: BildvalRoundFunction = useCallback(() => {
    if (!list || !ikeaMap) {
      return;
    }
    // Get random solution word from unique item list
    const solutionWord: string = list[Math.floor(Math.random() * list.length)];
    const guessWords: string[] = [];

    if (!(solutionWord in ikeaMap)) {
      return;
    }

    // Add 3 random non-solution words to guess words
    while (guessWords.length < 3) {
      const guess: string = list[Math.floor(Math.random() * list.length)];
      if (guess !== solutionWord && !guessWords.includes(guess)) {
        guessWords.push(guess);
      }
    }

    // Add solution to guesses
    guessWords.push(solutionWord);

    // Shuffle guess words
    guessWords.sort(() => Math.random() - 0.5);

    const solution: IKEAProduct = ikeaMap[solutionWord];
    const guesses: IKEAProduct[] = guessWords.map((word) => ikeaMap[word]);

    return {
      solution,
      guesses,
    };
  }, [ikeaMap, list]);

  return { getBildvalRound };
};
