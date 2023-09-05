"use client";

import React, { forwardRef } from "react";
import { Box, BoxProps, VStack } from "@chakra-ui/react";

import { PADDING } from "@/theme";

interface GameContainerProps extends Partial<BoxProps> {
  shouldSnap?: boolean;
}

export const GameContainer = forwardRef<HTMLDivElement, GameContainerProps>(
  ({ shouldSnap, children, ...props }, ref) => (
    <Box minH="100vh" id="gameContainer" scrollSnapAlign={shouldSnap ? "center" : undefined} {...props} ref={ref}>
      <VStack
        alignItems="stretch"
        py={PADDING.DEFAULT}
        minH="100vh"
        justifyContent="space-between"
        spacing={PADDING.LG}
      >
        {children}
      </VStack>
    </Box>
  ),
);
GameContainer.displayName = "GameContainer";
