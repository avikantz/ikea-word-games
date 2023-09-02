"use client";

import { Container, SimpleGrid, Skeleton, VStack } from "@chakra-ui/react";

import { BildvalGuessOptionSkeleton } from "@/components/bildval";
import { PADDING } from "@/theme";

export default function Loading() {
  return (
    <Container maxW="container.lg" px="0">
      <VStack alignItems="stretch" spacing={PADDING.LG} pt="109px">
        <Skeleton h="84px" mt="8" />

        <SimpleGrid columns={{ base: 2, md: 4 }} gap={PADDING.DEFAULT}>
          <BildvalGuessOptionSkeleton />
          <BildvalGuessOptionSkeleton />
          <BildvalGuessOptionSkeleton />
          <BildvalGuessOptionSkeleton />
        </SimpleGrid>
      </VStack>
    </Container>
  );
}
