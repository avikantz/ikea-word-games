"use client";

import { ModeCard } from "@/components";
import {
  PATH_JUMBLE_CUSTOM,
  PATH_JUMBLE_EASY,
  PATH_JUMBLE_HARD,
  PATH_JUMBLE_INSANE,
  PATH_JUMBLE_MEDIUM,
} from "@/utils/paths";
import { Heading, SimpleGrid, Text } from "@chakra-ui/react";

function JumbleGame() {
  return (
    <>
      <Heading textAlign="center" mb={{ base: 4, md: 8 }}>
        Jumble
      </Heading>

      <Text textAlign="center">Form a word from the given letters to match an IKEA product.</Text>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 4, lg: 8 }} py={{ base: 4, md: 8 }}>
        <ModeCard title="Easy" desc="Guess only the most popular products!" href={PATH_JUMBLE_EASY} bg="green.100" />
        <ModeCard title="Medium" desc="Includes most on shelf products!" href={PATH_JUMBLE_MEDIUM} bg="yellow.200" />
        <ModeCard title="Hard" desc="Top 500 all time products" href={PATH_JUMBLE_HARD} bg="orange.200" />
        <ModeCard title="Insane" href={PATH_JUMBLE_INSANE} bg="red.200">
          <Text color="gray.500">
            All products are on the <s>table</s> lagkapten
          </Text>
        </ModeCard>
        <ModeCard title="Custom" desc="Custom word length" href={PATH_JUMBLE_CUSTOM} />
      </SimpleGrid>
    </>
  );
}

export default JumbleGame;
