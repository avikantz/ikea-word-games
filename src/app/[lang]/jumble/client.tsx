"use client";

import { Box, Container } from "@chakra-ui/react";
import { PADDING } from "@/theme";

export default function JumbleClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Box>
        <Container py={PADDING.DEFAULT} maxW="container.xl">
          {children}
        </Container>
      </Box>
    </main>
  );
}
