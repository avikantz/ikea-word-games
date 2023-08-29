"use client";

import { Container, SimpleGrid, Skeleton, VStack } from "@chakra-ui/react";

import { OrdvalGuessOptionSkeleton } from "@/components/ordval";

export default function Loading() {
  return (
    <Container maxW="container.lg" px="0">
      <VStack alignItems="stretch" spacing={{ base: 6, md: 8 }} pt="138px">
        <Skeleton h="78px" />

        <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 6, md: 8 }}>
          <OrdvalGuessOptionSkeleton />
          <OrdvalGuessOptionSkeleton />
          <OrdvalGuessOptionSkeleton />
          <OrdvalGuessOptionSkeleton />
        </SimpleGrid>
      </VStack>
    </Container>
  );
}
