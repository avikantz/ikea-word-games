"use client";

import { Container, SimpleGrid, Skeleton, VStack } from "@chakra-ui/react";

import { OrdvalGuessOptionSkeleton } from "@/components/ordval";
import { PADDING } from "@/theme";

export default function Loading() {
  return (
    <Container maxW="container.lg" px="0">
      <VStack alignItems="stretch" spacing={PADDING.LG} pt="60px">
        <Skeleton h="78px" />

        <SimpleGrid columns={{ base: 1, md: 2 }} gap={PADDING.LG}>
          <OrdvalGuessOptionSkeleton />
          <OrdvalGuessOptionSkeleton />
          <OrdvalGuessOptionSkeleton />
          <OrdvalGuessOptionSkeleton />
        </SimpleGrid>
      </VStack>
    </Container>
  );
}
