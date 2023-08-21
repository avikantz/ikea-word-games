"use client";

import { Box, Center, Container, Heading, SimpleGrid, Text } from "@chakra-ui/react";

import { JUMBLE } from "@/utils/paths";
import { ModeCard } from "@/components";

export default function Home() {
  return (
    <main>
      <Box h="100vh">
        <Container py={{ base: 4, md: 12 }} h="full" maxW="container.xl">
          <Center mb={{ base: 4, md: 8 }}>
            <Heading textAlign="center">IKEA Word Games</Heading>
          </Center>

          <Text textAlign="center">
            A fun collection of word games based on IKEA products.
          </Text>

          <SimpleGrid
            columns={{ base: 1, md: 3 }}
            spacing={{ base: 4, lg: 8 }}
            py={{ base: 4, md: 8 }}
          >
            <ModeCard
              title="Jumble"
              desc="Form a word from the given letters to match an IKEA product."
              href={JUMBLE}
            />
            <ModeCard
              title="Scrabble"
              isDisabled
              desc="Coming soon!"
              href={JUMBLE}
            />
          </SimpleGrid>
        </Container>
      </Box>
    </main>
  );
}
