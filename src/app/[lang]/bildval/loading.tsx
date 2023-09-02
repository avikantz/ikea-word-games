"use client";

import { SimpleGrid } from "@chakra-ui/react";

import { ModeCardSkeleton, PageTitleSkeleton } from "@/components";
import { PADDING } from "@/theme";

export default function Loading() {
  return (
    <>
      <PageTitleSkeleton withDesc />

      <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={PADDING.DEFAULT}>
        <ModeCardSkeleton />
        <ModeCardSkeleton />
        <ModeCardSkeleton />
        <ModeCardSkeleton />
        <ModeCardSkeleton />
      </SimpleGrid>
    </>
  );
}
