"use client";

import { Container, Skeleton, VStack } from "@chakra-ui/react";

import { IKEAProductCardSkeleton, WordInputSkeleton } from "@/components";
import { PADDING } from "@/theme";

export default function Loading() {
  return (
    <Container maxW="container.lg" px="0">
      <VStack alignItems="stretch" spacing={PADDING.LG} maxW={{ base: "full", md: "500px" }} mx="auto" pt="60px">
        <IKEAProductCardSkeleton />

        <Skeleton h="52px" />

        <WordInputSkeleton />
      </VStack>
    </Container>
  );
}
