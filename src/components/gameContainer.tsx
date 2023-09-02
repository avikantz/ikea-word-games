import React, { forwardRef } from "react";
import { Box, BoxProps, VStack } from "@chakra-ui/react";
import { PADDING } from "@/theme";

export const GameContainer = forwardRef<HTMLDivElement, Partial<BoxProps>>(({ children, ...props }, ref) => (
  <Box minH="100vh" id="gameContainer" {...props} ref={ref}>
    <VStack alignItems="stretch" py={PADDING.DEFAULT} minH="100vh" justifyContent="space-between" spacing={PADDING.LG}>
      {children}
    </VStack>
  </Box>
));
GameContainer.displayName = "GameContainer";
