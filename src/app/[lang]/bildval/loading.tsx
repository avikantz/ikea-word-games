"use client";

import { SimpleGrid } from "@chakra-ui/react";

import { ModeCardSkeleton, PageTitleSkeleton } from "@/components";
import { GRID_COLUMNS, PADDING } from "@/theme";

export default function Loading() {
  return (
    <>
      <PageTitleSkeleton withDesc />

      <SimpleGrid columns={GRID_COLUMNS} spacing={PADDING.DEFAULT}>
        <ModeCardSkeleton />
        <ModeCardSkeleton />
        <ModeCardSkeleton />
        <ModeCardSkeleton />
        <ModeCardSkeleton />
      </SimpleGrid>
    </>
  );
}
