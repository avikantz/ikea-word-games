"use client";

import { Box, Container } from "@chakra-ui/react";

export default function JumbleLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Box minH="100vh">
        <Container py={{ base: 4, md: 12 }} h="full" maxW="container.xl">
          {children}
        </Container>
      </Box>
    </main>
  );
}