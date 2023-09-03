"use client";

import { Ref, useCallback, useEffect, useRef, useState } from "react";
import { Box, Button, HStack, SimpleGrid, Skeleton, Spacer, Text, useDisclosure, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useAnimate } from "framer-motion";
import { event } from "nextjs-google-analytics";

import { GameContainer, GameMultiplier, GameOverModal, GameRound, GameScore, GameTitle } from "@/components";
import { OrdvalRound, IKEAProduct, GAME_MODE, ModePageProps, GAMES } from "@/interfaces";
import { PATH_ORDVAL } from "@/utils/paths";
import { ORDVAL } from "@/utils/constants";
import { useOrdval } from "@/hooks/useOrdval";
import { useScores } from "@/hooks/useScores";
import { OrdvalGuessOption, OrdvalGuessOptionSkeleton, OrdvalHowToPlayModal } from "@/components/ordval";
import { useTranslation } from "@/app/i18n/client";
import { useEffectTimeout } from "@/hooks/useEffectTimeout";
import { PADDING } from "@/theme";

function OrdvalGameMode({ params: { mode, lang } }: ModePageProps) {
  const router = useRouter();
  const [difficulty, setDifficulty] = useState<GAME_MODE>("easy");

  // Translations
  const { t } = useTranslation(lang);
  const { t: o } = useTranslation(lang, GAMES.ORDVAL);

  // Modals
  const {
    isOpen: isOpenHowToPlayModal,
    onOpen: onOpenHowToPlayModal,
    onClose: onCloseHowToPlayModal,
  } = useDisclosure();

  const { isOpen: isOpenGameOverModal, onOpen: onOpenGameOverModal, onClose: onCloseGameOverModal } = useDisclosure();

  // Refs
  const containerRef = useRef<HTMLDivElement>();
  const nextButtonRef = useRef<HTMLButtonElement>();
  const [multiplierRef, animateMultiplier] = useAnimate();
  const [scoreRef, animateScore] = useAnimate();

  // Game state
  const words = useRef<string[]>([]).current;

  const [passCount, setPassCount] = useState<number>(0);
  const [round, setRound] = useState<number>(1);
  const [score, setScore] = useState<number>(0);
  const [multiplier, setMultiplier] = useState<number>(1);

  const [showSolution, setShowSolution] = useState<boolean>(false);

  // Scoring
  const { scores, saveScore } = useScores({ game: GAMES.ORDVAL, mode: difficulty });

  // Ordval round
  const [ordvalRound, setOrdvalRound] = useState<OrdvalRound>();

  const { getOrdvalRound } = useOrdval({ mode: difficulty });

  // Check difficulty param
  useEffect(() => {
    if (mode) {
      if (["easy", "medium", "hard", "insane"].includes(mode)) {
        setDifficulty(mode as GAME_MODE);
      } else {
        alert("Invalid mode");
        router.replace(PATH_ORDVAL);
      }
    }
  }, [mode, router]);

  const getOrdvalWords = useCallback(async () => {
    // Fetch new ordval round
    let ordvalRound = getOrdvalRound();
    // Prevent existing solutions from being repeated
    while (ordvalRound && words.includes(ordvalRound.solution.name)) {
      ordvalRound = getOrdvalRound();
    }
    setOrdvalRound(ordvalRound);

    if (ordvalRound) words.push(ordvalRound.solution.name);

    // Scroll game container in view
    containerRef.current?.scrollIntoView({ behavior: "smooth" });

    // Unfocus next button
    nextButtonRef.current?.blur();

    // Track round event
    event(ORDVAL.ROUND_EVENT, { category: difficulty });

    setShowSolution(false);
  }, [difficulty, getOrdvalRound, words]);

  // Get a new word on load
  useEffectTimeout(
    () => {
      getOrdvalWords();
    },
    [getOrdvalWords],
    1000,
  );

  // Animate score on change
  useEffect(() => {
    if (score > 0) {
      animateScore(scoreRef.current, { scale: [1, 1.2, 1], translateY: [0, -10, 0] }, { duration: 0.3, delay: 0.1 });
    }
  }, [score, animateScore, scoreRef]);

  // Animate multiplier on change
  useEffect(() => {
    if (multiplier > 0) {
      animateMultiplier(multiplierRef.current, { scale: [1, 1.2, 1], translateY: [0, -20, 0] }, { duration: 0.3 });
    }
  }, [multiplier, animateMultiplier, multiplierRef]);

  const onPass = () => {
    if (passCount < ORDVAL.MAX_PASSES) {
      setPassCount(passCount + 1);
      getOrdvalWords();
    }
  };

  const onNextRound = () => {
    if (round < ORDVAL.MAX_ROUNDS) {
      // Proceed to next round
      setRound((round) => round + 1);
      getOrdvalWords();
    } else {
      // Track game event
      event(ORDVAL.GAME_EVENT, { category: difficulty });
      // Save final score
      saveScore(score);
      // Open game over modal
      onOpenGameOverModal();
    }
  };

  // Match the selected option with the solution
  const onMatch = (item: IKEAProduct) => {
    if (!ordvalRound) return;

    if (item.name === ordvalRound.solution.name) {
      // Update multiplier
      setMultiplier((multiplier) => Math.min(multiplier + 1, ORDVAL.MAX_MULTIPLIER));
      // Update score
      setScore((score) => score + ORDVAL.ROUND_SCORE * multiplier);
    } else {
      // Reset multiplier
      setMultiplier(1);
    }

    // Highlight correct option on round end
    setShowSolution(true);

    // Focus next button after delay
    setTimeout(() => {
      nextButtonRef.current?.focus();
    }, 100);
  };

  return (
    <Box>
      <GameTitle title={o("title_difficulty", { difficulty: t(difficulty) })} onInfoClick={onOpenHowToPlayModal} />

      <GameContainer ref={containerRef as Ref<HTMLDivElement>}>
        {round > 0 && (
          <HStack minW={{ base: "full", md: "500" }} justifyContent="space-between">
            <GameRound round={round} maxRounds={ORDVAL.MAX_ROUNDS} />

            <Spacer />

            <GameMultiplier multiplier={multiplier} ref={multiplierRef} />

            <GameScore score={score} ref={scoreRef} />
          </HStack>
        )}

        {/* Active game */}
        {(ordvalRound && round > 0 && round <= ORDVAL.MAX_ROUNDS && (
          <VStack alignItems="stretch" spacing={PADDING.LG}>
            <Box px={{ base: 6, md: 12 }} py={{ base: 2, md: 4 }} bg="gray.50">
              <Text textAlign="center" fontSize={{ base: "xl", md: "3xl" }} fontWeight="semibold">
                {o("question", { product: ordvalRound.solution.desc.clean() })}
              </Text>
            </Box>

            <SimpleGrid columns={{ base: 1, md: 2 }} gap={PADDING.LG}>
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
          <VStack alignItems="stretch" spacing={PADDING.LG}>
            <Skeleton h="78px" />

            <SimpleGrid columns={{ base: 1, md: 2 }} gap={PADDING.LG}>
              <OrdvalGuessOptionSkeleton />
              <OrdvalGuessOptionSkeleton />
              <OrdvalGuessOptionSkeleton />
              <OrdvalGuessOptionSkeleton />
            </SimpleGrid>
          </VStack>
        )}

        <HStack justifyContent="space-between">
          {/* Skip */}
          <Button
            variant="outline"
            alignSelf="center"
            onClick={onPass}
            isLoading={!ordvalRound}
            loadingText={t("pass")}
            isDisabled={round > ORDVAL.MAX_ROUNDS || passCount >= ORDVAL.MAX_PASSES || showSolution}
          >
            {t("pass_count", { count: ORDVAL.MAX_PASSES - passCount })}
          </Button>

          {/* Next */}
          <Button
            variant="outline"
            ref={nextButtonRef as Ref<HTMLButtonElement>}
            onClick={onNextRound}
            isDisabled={!ordvalRound || round > ORDVAL.MAX_ROUNDS || !showSolution}
            alignSelf="center"
          >
            {round === 0 ? t("start") : round === ORDVAL.MAX_ROUNDS ? t("finish") : t("next")}
          </Button>
        </HStack>

        <Spacer display={{ base: "flex", md: "none" }} />
      </GameContainer>

      <OrdvalHowToPlayModal isOpen={isOpenHowToPlayModal} onClose={onCloseHowToPlayModal} />

      <GameOverModal
        isOpen={isOpenGameOverModal}
        onClose={onCloseGameOverModal}
        score={score}
        scores={scores}
        onCloseComplete={() => router.replace(PATH_ORDVAL)}
      />
    </Box>
  );
}

export default OrdvalGameMode;
