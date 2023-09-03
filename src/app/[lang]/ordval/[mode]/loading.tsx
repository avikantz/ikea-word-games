"use client";

import { SimpleGrid, Skeleton } from "@chakra-ui/react";

import { OrdvalGuessOptionSkeleton } from "@/components/ordval";
import { PADDING } from "@/theme";
import { GameContainer } from "@/components/gameContainer";

export default function Loading() {
  return (
    <GameContainer pt="138px">
      <Skeleton h="78px" />

      <SimpleGrid columns={{ base: 1, md: 2 }} gap={PADDING.LG}>
        <OrdvalGuessOptionSkeleton />
        <OrdvalGuessOptionSkeleton />
        <OrdvalGuessOptionSkeleton />
        <OrdvalGuessOptionSkeleton />
      </SimpleGrid>
    </GameContainer>
  );
}
