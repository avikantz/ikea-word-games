"use client";

import { Skeleton, VStack } from "@chakra-ui/react";

import { GameContainer, IKEAProductCardSkeleton, WordInputSkeleton } from "@/components";
import { PADDING } from "@/theme";

export default function Loading() {
  return (
    <GameContainer pt="139px">
      <VStack alignItems={{ base: "stretch", md: "center" }} spacing={PADDING.LG}>
        <IKEAProductCardSkeleton />

        <Skeleton h="52px" />

        <WordInputSkeleton />
      </VStack>
    </GameContainer>
  );
}
