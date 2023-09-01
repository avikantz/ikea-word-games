import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { event } from "nextjs-google-analytics";

import { Q_MAP_KEY, Q_UNIQUE_KEY, UniqueQuery, fetchMap, fetchUnique } from "@/queries";
import { IKEAProduct } from "@/interfaces";
import { getLevenshteinDistance } from "@/utils/levenshtein";
import { VADARJAG } from "@/utils/constants";

type VadarjagListFunction = (searchTerm: string) => IKEAProduct[];

interface useVadarjagProps {
  count?: number;
}

interface DistanceListItem {
  item: string;
  distance: number;
}

export const useVadarjag = ({ count = 10 }: useVadarjagProps) => {
  // Map of names to IKEA products
  const { data: ikeaMap } = useQuery<unknown, unknown, Record<string, IKEAProduct>>([Q_MAP_KEY], fetchMap);

  // List of unique IKEA product names
  const { data: list } = useQuery<unknown, unknown, string[], [string, UniqueQuery]>([Q_UNIQUE_KEY, {}], fetchUnique);

  const getClosestProducts: VadarjagListFunction = useCallback(
    (searchTerm: string) => {
      if (!list || !ikeaMap) {
        return [];
      }

      const distanceList: DistanceListItem[] = [];
      // Generate levenstein distance for each item in list
      let i = 0,
        len = list.length;
      while (i < len) {
        const item = list[i];
        const distance = getLevenshteinDistance(item.removeAccents(), searchTerm.removeAccents());
        distanceList.push({ item, distance });
        i++;
      }

      // Sort by distance
      distanceList.sort((a, b) => a.distance - b.distance);

      // Get top "count" closest items
      i = 0;
      const closestProducts: IKEAProduct[] = [];
      while (i < count) {
        const { item } = distanceList[i];
        closestProducts.push(ikeaMap[item]);
        i++;
      }

      event(VADARJAG.ROUND_EVENT);

      return closestProducts;
    },
    [count, ikeaMap, list],
  );

  return { getClosestProducts };
};
