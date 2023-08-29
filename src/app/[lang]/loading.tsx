"use client";

import { Box, Container, SimpleGrid, Skeleton } from "@chakra-ui/react";

import { ModeCardSkeleton } from "@/components";

export default function Loading() {
  return (
    <Box minH="100vh">
      <Container py={{ base: 4, md: 12 }} h="full" maxW="container.xl">
        <Skeleton mx="auto" w="48" h="10" mb={{ base: 4, md: 8 }} />

        <Skeleton mx="auto" w="50%" h="6" />

        <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={{ base: 4, md: 6, xl: 8 }} py={{ base: 4, md: 8 }}>
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
