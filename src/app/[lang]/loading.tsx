"use client";

import { Box, Container, SimpleGrid } from "@chakra-ui/react";

import { ModeCardSkeleton, PageTitleSkeleton } from "@/components";

export default function Loading() {
  return (
    <Box minH="100vh">
      <Container py={{ base: 4, md: 12 }} h="full" maxW="container.xl">
        <PageTitleSkeleton withDesc />

        <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={{ base: 4, md: 6, xl: 8 }}>
          <ModeCardSkeleton />
          <ModeCardSkeleton />
          <ModeCardSkeleton />
          <ModeCardSkeleton />
          <ModeCardSkeleton />
        </SimpleGrid>
      </Container>
    </Box>
  );
}
