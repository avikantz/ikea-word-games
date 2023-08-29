"use client";

import { Ref, useCallback, useRef, useState } from "react";
import { Box, Button, Container, Heading, SimpleGrid, Skeleton, Text, VStack } from "@chakra-ui/react";
import { event } from "nextjs-google-analytics";

import { GAMES, IKEAProduct, OrdvalRound, PageProps } from "@/interfaces";
import { useOrdval } from "@/hooks/useOrdval";
import { OrdvalGuessOption, OrdvalGuessOptionSkeleton } from "@/components/ordval";
import { ORDVAL } from "@/utils/constants";
import { useTranslation } from "@/app/i18n/client";
import { useEffectTimeout } from "@/hooks/useEffectTimeout";

function OrdvalGameUnlimited({ params: { lang } }: PageProps) {
  // Translations
  const { t } = useTranslation(lang);
  const { t: o } = useTranslation(lang, GAMES.ORDVAL);

  // Refs
  const nextButtonRef = useRef<HTMLButtonElement>();

  // Game state
  const [showSolution, setShowSolution] = useState<boolean>(false);

  // Ordval round
  const [ordvalRound, setOrdvalRound] = useState<OrdvalRound>();

  const { getOrdvalRound } = useOrdval({});

  const getOrdvalWords = useCallback(async () => {
    // Fetch new ordval round
    setOrdvalRound(getOrdvalRound());

    // Unfocus next button
    nextButtonRef.current?.blur();

    // Track round event
    event(ORDVAL.ROUND_EVENT, { category: "unlimited" });

    setShowSolution(false);
  }, [getOrdvalRound]);

  // Get a new word on load
  useEffectTimeout(
    () => {
      getOrdvalWords();
    },
    [getOrdvalWords],
    1000,
  );

  const onPass = () => {
    getOrdvalWords();
  };

  // Match the selected option with the solution
  const onMatch = (item: IKEAProduct) => {
    if (!ordvalRound) return;

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
          {o("title_difficulty", { difficulty: "∞" })}
        </Heading>

        {/* Active game */}
        {(ordvalRound && (
          <VStack alignItems="stretch" spacing="8">
            <Box px={{ base: 6, md: 12 }} py="4" bg="gray.50">
              <Text textAlign="center" fontSize={{ base: "xl", md: "3xl" }} fontWeight="semibold">
                {o("question", { product: ordvalRound.solution.desc.clean() })}
              </Text>
            </Box>

            <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 4, md: 8 }}>
              {ordvalRound.guesses.map((guess) => (
                <OrdvalGuessOption
                  key={guess.name}
                  guess={guess}
                  solution={ordvalRound.solution}
                  showSolution={showSolution}
                  onClick={() => onMatch(guess)}
                />
              ))}
            </SimpleGrid>
          </VStack>
        )) || (
          <VStack alignItems="stretch" spacing="8">
            <Skeleton h="78px" />

            <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 4, md: 8 }}>
              <OrdvalGuessOptionSkeleton />
              <OrdvalGuessOptionSkeleton />
              <OrdvalGuessOptionSkeleton />
              <OrdvalGuessOptionSkeleton />
            </SimpleGrid>
          </VStack>
        )}

        {/* Skip */}
        <Button
          ref={nextButtonRef as Ref<HTMLButtonElement>}
          variant="outline"
          alignSelf="center"
          onClick={onPass}
          isLoading={!ordvalRound}
          loadingText={t("pass")}
        >
          {showSolution ? t("next") : t("pass")}
        </Button>
      </VStack>
    </Container>
  );
}

export default OrdvalGameUnlimited;
