"use client";

import { Ref, useCallback, useRef, useState } from "react";
import { Box, Button, SimpleGrid, Skeleton, Spacer, Text } from "@chakra-ui/react";
import { event } from "nextjs-google-analytics";

import { BildvalRound, IKEAProduct, PageProps } from "@/interfaces";
import { useBildval } from "@/hooks/useBildval";
import { BildvalGuessOption, BildvalGuessOptionSkeleton } from "@/components/bildval";
import { BILDVAL } from "@/utils/constants";
import { useTranslation } from "@/app/i18n/client";
import { useEffectTimeout } from "@/hooks/useEffectTimeout";
import { GameTitle } from "@/components/gameTitle";
import { PADDING } from "@/theme";
import { GameContainer } from "@/components/gameContainer";

function BildvalGameUnlimited({ params: { lang } }: PageProps) {
  // Translations
  const { t } = useTranslation(lang);

  // Refs
  const containerRef = useRef<HTMLDivElement>();
  const nextButtonRef = useRef<HTMLButtonElement>();

  // Game state
  const [showSolution, setShowSolution] = useState<boolean>(false);

  // Bildval round
  const [bildvalRound, setBildvalRound] = useState<BildvalRound>();

  const { getBildvalRound } = useBildval({});

  const getBildvalWords = useCallback(async () => {
    // Fetch new bildval round
    setBildvalRound(getBildvalRound());

    // Scroll game container into view
    containerRef.current?.scrollIntoView({ behavior: "smooth" });

    // Unfocus next button
    nextButtonRef.current?.blur();

    // Track round event
    event(BILDVAL.ROUND_EVENT, { category: "unlimited" });

    setShowSolution(false);
  }, [getBildvalRound]);

  // Get a new word on load
  useEffectTimeout(
    () => {
      getBildvalWords();
    },
    [getBildvalWords],
    1000,
  );

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
    <Box>
      <GameTitle title={t("bildval.title_difficulty", { difficulty: "∞" })} />

      <GameContainer shouldSnap={bildvalRound && !showSolution} ref={containerRef as Ref<HTMLDivElement>}>
        {/* Active game */}
        {(bildvalRound && (
          <Box px="6" py={{ base: 2, md: 4 }} bg="gray.50">
            <Text textAlign="center" fontSize={{ base: "2xl", md: "4xl" }} fontWeight="semibold">
              {t("bildval.question", { product: bildvalRound.solution.name })}
            </Text>
          </Box>
        )) || <Skeleton h="84px" />}

        <SimpleGrid columns={{ base: 2, md: 4 }} gap={PADDING.DEFAULT}>
          {(bildvalRound &&
            bildvalRound.guesses.map((guess) => (
              <BildvalGuessOption
                key={guess.name}
                guess={guess}
                solution={bildvalRound.solution}
                showSolution={showSolution}
                onClick={() => onMatch(guess)}
              />
            ))) ||
            [1, 2, 3, 4].map((i) => <BildvalGuessOptionSkeleton key={`guess-skel-${i}`} />)}
        </SimpleGrid>

        {/* Skip */}
        <Button
          ref={nextButtonRef as Ref<HTMLButtonElement>}
          variant="outline"
          alignSelf="center"
          onClick={onPass}
          isLoading={!bildvalRound}
          loadingText={t("common.pass")}
        >
          {showSolution ? t("common.next") : t("common.pass")}
        </Button>

        <Spacer display={{ base: "flex", md: "none" }} />
      </GameContainer>
    </Box>
  );
}

export default BildvalGameUnlimited;
