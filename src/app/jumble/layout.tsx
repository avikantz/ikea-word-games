"use client";

import { Box, Center, Container, Heading } from "@chakra-ui/react";

export default function JumbleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main>
        <Box h="100vh">
          <Container py={{ base: 4, md: 12 }} h="full" maxW="container.xl">
            <Center mb={{ base: 4, md: 8 }}>
              <Heading textAlign="center">Jumble</Heading>
            </Center>
            {children}
          </Container>
        </Box>
      </main>
    </>
  );
}
