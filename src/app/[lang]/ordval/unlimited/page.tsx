"use client";

import { Ref, useCallback, useRef, useState } from "react";
import { Box, Button, SimpleGrid, Skeleton, Spacer, Text } from "@chakra-ui/react";
import { event } from "nextjs-google-analytics";

import { IKEAProduct, OrdvalRound, PageProps } from "@/interfaces";
import { useOrdval } from "@/hooks/useOrdval";
import { OrdvalGuessOption, OrdvalGuessOptionSkeleton } from "@/components/ordval";
import { ORDVAL } from "@/utils/constants";
import { useTranslation } from "@/app/i18n/client";
import { useEffectTimeout } from "@/hooks/useEffectTimeout";
import { GameTitle } from "@/components/gameTitle";
import { PADDING } from "@/theme";
import { GameContainer } from "@/components/gameContainer";

function OrdvalGameUnlimited({ params: { lang } }: PageProps) {
  // Translations
  const { t } = useTranslation(lang);

  // Refs
  const containerRef = useRef<HTMLDivElement>();
  const nextButtonRef = useRef<HTMLButtonElement>();

  // Game state
  const [showSolution, setShowSolution] = useState<boolean>(false);

  // Ordval round
  const [ordvalRound, setOrdvalRound] = useState<OrdvalRound>();

  const { getOrdvalRound } = useOrdval({});

  const getOrdvalWords = useCallback(async () => {
    // Fetch new ordval round
    setOrdvalRound(getOrdvalRound());

    // Scroll game container into view
    containerRef.current?.scrollIntoView({ behavior: "smooth" });

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
    <Box>
      <GameTitle title={t("ordval.title_difficulty", { difficulty: "∞" })} />

      <GameContainer shouldSnap={ordvalRound && !showSolution} ref={containerRef as Ref<HTMLDivElement>}>
        {/* Active game */}
        {(ordvalRound && (
          <Box px={{ base: 6, md: 12 }} py={{ base: 2, md: 4 }} bg="gray.50">
            <Text textAlign="center" fontSize={{ base: "xl", md: "3xl" }} fontWeight="semibold">
              {t("ordval.question", { product: ordvalRound.solution.desc.clean() })}
            </Text>
          </Box>
        )) || <Skeleton h="78px" />}

        <SimpleGrid columns={{ base: 2, md: 4 }} gap={PADDING.LG}>
          {(ordvalRound &&
            ordvalRound.guesses.map((guess) => (
              <OrdvalGuessOption
                key={guess.name}
                guess={guess}
                solution={ordvalRound.solution}
                showSolution={showSolution}
                onClick={() => onMatch(guess)}
              />
            ))) ||
            [1, 2, 3, 4].map((i) => <OrdvalGuessOptionSkeleton key={`guess-skel-${i}`} />)}
        </SimpleGrid>

        {/* Skip */}
        <Button
          ref={nextButtonRef as Ref<HTMLButtonElement>}
          variant="outline"
          alignSelf="center"
          onClick={onPass}
          isLoading={!ordvalRound}
          loadingText={t("common.pass")}
        >
          {showSolution ? t("common.next") : t("common.pass")}
        </Button>

        <Spacer display={{ base: "flex", md: "none" }} />
      </GameContainer>
    </Box>
  );
}

export default OrdvalGameUnlimited;
