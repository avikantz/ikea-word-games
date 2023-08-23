"use client";

import { ModeCard } from "@/components";
import { PATH_BILDVAL_EASY, PATH_BILDVAL_HARD, PATH_BILDVAL_INSANE, PATH_BILDVAL_MEDIUM } from "@/utils/paths";
import { Heading, SimpleGrid, Text } from "@chakra-ui/react";

function BildvalGame() {
  return (
    <>
      <Heading textAlign="center" mb={{ base: 4, md: 8 }}>
        Bildval
      </Heading>

      <Text textAlign="center">Guess what picture matches the given product name.</Text>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 4, lg: 8 }} py={{ base: 4, md: 8 }}>
        <ModeCard title="Easy" desc="Guess only the most popular products!" href={PATH_BILDVAL_EASY} bg="green.100" />
        <ModeCard title="Medium" desc="Includes most on shelf products!" href={PATH_BILDVAL_MEDIUM} bg="yellow.200" />
        <ModeCard title="Hard" desc="Top 500 all time products" href={PATH_BILDVAL_HARD} bg="orange.200" />
        <ModeCard title="Insane" href={PATH_BILDVAL_INSANE} bg="red.200">
          <Text color="gray.500">
            All products are on the <s>table</s> lagkapten
          </Text>
        </ModeCard>
      </SimpleGrid>
    </>
  );
}

export default BildvalGame;
