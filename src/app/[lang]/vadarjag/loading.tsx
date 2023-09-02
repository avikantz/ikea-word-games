"use client";

import { Skeleton } from "@chakra-ui/react";

import { PageTitleSkeleton } from "@/components";

export default function Loading() {
  return (
    <>
      <PageTitleSkeleton withDesc />

      <Skeleton height="20" />
    </>
  );
}
