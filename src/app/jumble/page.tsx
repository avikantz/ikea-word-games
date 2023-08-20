"use client";

import { ModeCard } from "@/components";
import {
  JUMBLE_CUSTOM,
  JUMBLE_EASY,
  JUMBLE_HARD,
  JUMBLE_INSANE,
  JUMBLE_MEDIUM,
} from "@/utils/paths";
import { Center, SimpleGrid, Text } from "@chakra-ui/react";

function JumbleGame() {
  return (
    <>
      <Center mb={{ base: 4, md: 8 }}>
        <Text textAlign="center">
          Form a word from the given letters to match an IKEA product.
        </Text>
      </Center>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 4, lg: 8 }}>
        <ModeCard
          title="Easy"
          desc="Guess only the most popular products!"
          href={JUMBLE_EASY}
          bg="green.100"
        />
        <ModeCard
          title="Medium"
          desc="Includes most on shelf products!"
          href={JUMBLE_MEDIUM}
          bg="yellow.200"
        />
        <ModeCard
          title="Hard"
          desc="Top 500 all time products"
          href={JUMBLE_HARD}
          bg="orange.200"
        />
        <ModeCard title="Insane" href={JUMBLE_INSANE} bg="red.200">
          <Text color="gray.500">
            All products are on the <s>table</s> lagkapten
          </Text>
        </ModeCard>
        <ModeCard
          title="Custom"
          desc="Custom word length"
          href={JUMBLE_CUSTOM}
        />
      </SimpleGrid>
    </>
  );
}

export default JumbleGame;
