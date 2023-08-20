import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";

import { Q_MAP_KEY, Q_UNIQUE_KEY, UniqueQuery, fetchMap, fetchUnique } from "@/queries";
import { IKEAJumbleWord, IKEAProduct } from "@/interfaces";

interface UseJumbleProps {
  length?: number;
  mode?: "easy" | "medium" | "hard";
}

type JumbleWordFunction = () => IKEAJumbleWord | undefined;

export const useJumble = ({ length, mode }: UseJumbleProps) => {
  // Map of names to IKEA products
  const { data: ikeaMap } = useQuery<
    unknown,
    unknown,
    Record<string, IKEAProduct>
  >([Q_MAP_KEY], fetchMap);

  // List of unique IKEA product names
  const { data: list } = useQuery<
    unknown,
    unknown,
    string[],
    [string, UniqueQuery]
  >([Q_UNIQUE_KEY, { length, mode }], fetchUnique);

  const getJumbleWord: JumbleWordFunction = useCallback(() => {
    if (!list || !ikeaMap) {
      return;
    }
    // Get random word from unique item list
    const randomWord: string = list[Math.floor(Math.random() * list.length)];

    if (!(randomWord in ikeaMap)) {
      return;
    }

    return {
      word: randomWord,
      shuffledWord: randomWord.shuffle(),
      product: ikeaMap[randomWord],
    };
  }, [ikeaMap, list]);

  return { getJumbleWord };
};
