"use client";

import { Box, Container, SimpleGrid } from "@chakra-ui/react";

import { ModeCardSkeleton, PageTitleSkeleton } from "@/components";
import { PADDING } from "@/theme";

export default function Loading() {
  return (
    <Box minH="100vh">
      <Container py={PADDING.DEFAULT} h="full" maxW="container.xl">
        <PageTitleSkeleton withDesc />

        <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={PADDING.DEFAULT}>
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
