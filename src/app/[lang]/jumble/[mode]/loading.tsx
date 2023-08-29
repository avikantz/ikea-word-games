"use client";

import { Container, Skeleton, VStack } from "@chakra-ui/react";

import { IKEAProductCardSkeleton, WordInputSkeleton } from "@/components";

export default function Loading() {
  return (
    <Container maxW="container.lg" px="0">
      <VStack
        alignItems="stretch"
        spacing={{ base: 6, md: 8 }}
        maxW={{ base: "full", md: "500px" }}
        mx="auto"
        pt="139px"
      >
        <IKEAProductCardSkeleton />

        <Skeleton h="52px" />

        <WordInputSkeleton />
      </VStack>
    </Container>
  );
}
