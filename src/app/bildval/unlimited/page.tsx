"use client";

import { Ref, useCallback, useEffect, useRef, useState } from "react";
import { Box, Button, Container, Heading, SimpleGrid, Spinner, Text, VStack } from "@chakra-ui/react";

import { BildvalRound, IKEAProduct } from "@/interfaces";
import { useBildval } from "@/hooks/useBildval";
import { BildvalGuessOption } from "@/components/bildval";

function BildvalGameMode() {
  // Refs
  const nextButtonRef = useRef<HTMLButtonElement>();

  // Game state
  const [showSolution, setShowSolution] = useState<boolean>(false);

  // Bildval round
  const [bildvalRound, setBildvalRound] = useState<BildvalRound>();

  const { getBildvalRound } = useBildval({});

  const getBildvalWords = useCallback(async () => {
    // Fetch new bildval round
    setBildvalRound(getBildvalRound());
    setShowSolution(false);
  }, [getBildvalRound]);

  // Get a new word on load
  useEffect(() => {
    getBildvalWords();
  }, [getBildvalWords]);

  const onPass = () => {
    getBildvalWords();
  };

  // Match the selected option with the solution
  const onMatch = (item: IKEAProduct) => {
    if (!bildvalRound) return;

    // Highlight correct option on round end
    setShowSolution(true);

    // Focus next button after delay
    setTimeout(() => {
      nextButtonRef.current?.focus();
    }, 100);
  };

  return (
    <Container maxW="container.lg" px="0">
      <VStack alignItems="stretch" spacing={{ base: 4, md: 8 }}>
        <Heading textAlign="center" textTransform="capitalize" fontSize={{ base: "xl", md: "2xl" }}>
          Bildval ∞
        </Heading>

        {/* Active game */}
        {(bildvalRound && (
          <VStack alignItems="stretch" spacing="8">
            <Box px="6" py="2" rounded="md" bg="gray.50">
              <Text textAlign="center" fontSize={{ base: "2xl", md: "4xl" }} fontWeight="semibold">
                What is... {bildvalRound.solution.name}?
              </Text>
            </Box>

            <SimpleGrid columns={{ base: 2, md: 4 }} gap={{ base: 4, md: 8 }}>
              {bildvalRound.guesses.map((guess) => (
                <BildvalGuessOption
                  key={guess.name}
                  guess={guess}
                  solution={bildvalRound.solution}
                  showSolution={showSolution}
                  onClick={() => onMatch(guess)}
                />
              ))}
            </SimpleGrid>

            {/* Skip */}
            <Button
              ref={nextButtonRef as Ref<HTMLButtonElement>}
              size="sm"
              variant="outline"
              alignSelf="center"
              onClick={onPass}
              isLoading={!bildvalRound}
            >
              {showSolution ? "Next" : "Pass (∞)"}
            </Button>
          </VStack>
        )) || <Spinner size="lg" />}
      </VStack>
    </Container>
  );
}

export default BildvalGameMode;
