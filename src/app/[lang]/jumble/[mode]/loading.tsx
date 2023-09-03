"use client";

import { Skeleton } from "@chakra-ui/react";

import { GameContainer, IKEAProductCardSkeleton, WordInputSkeleton } from "@/components";

export default function Loading() {
  return (
    <GameContainer pt="139px">
      <IKEAProductCardSkeleton />

      <Skeleton h="52px" />

      <WordInputSkeleton />
    </GameContainer>
  );
}
