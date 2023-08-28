"use client";

import { Ref, useCallback, useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  IconButton,
  SimpleGrid,
  Spacer,
  Spinner,
  Tag,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useAnimate } from "framer-motion";
import { event } from "nextjs-google-analytics";

import { GameOverModal } from "@/components";
import { BildvalRound, IKEAProduct, GAME_MODE, ModePageProps } from "@/interfaces";
import { PATH_BILDVAL } from "@/utils/paths";
import { BILDVAL } from "@/utils/constants";
import { useScores } from "@/hooks/useScores";
import { useBildval } from "@/hooks/useBildval";
import { BildvalGuessOption, BildvalHowToPlayModal } from "@/components/bildval";
import { useTranslation } from "@/app/i18n/client";

function BildvalGameMode({ params: { mode, lang } }: ModePageProps) {
  const router = useRouter();
  const [difficulty, setDifficulty] = useState<GAME_MODE>("easy");

  // Translations
  const { t } = useTranslation(lang);
  const { t: b } = useTranslation(lang, "bildval");

  // Modals
  const {
    isOpen: isOpenHowToPlayModal,
    onOpen: onOpenHowToPlayModal,
    onClose: onCloseHowToPlayModal,
  } = useDisclosure();

  const { isOpen: isOpenGameOverModal, onOpen: onOpenGameOverModal, onClose: onCloseGameOverModal } = useDisclosure();

  // Refs
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
  const { scores, saveScore } = useScores({ game: "bildval", mode: difficulty });

  // Bildval round
  const [bildvalRound, setBildvalRound] = useState<BildvalRound>();

  const { getBildvalRound } = useBildval({ mode: difficulty });

  // Check difficulty param
  useEffect(() => {
    if (mode) {
      if (["easy", "medium", "hard", "insane"].includes(mode)) {
        setDifficulty(mode as GAME_MODE);
      } else {
        alert("Invalid mode");
        router.replace(PATH_BILDVAL);
      }
    }
  }, [mode, router]);

  const getBildvalWords = useCallback(async () => {
    // Fetch new bildval round
    let bildvalRound = getBildvalRound();
    // Prevent existing solutions from being repeated
    while (bildvalRound && words.includes(bildvalRound.solution.name)) {
      bildvalRound = getBildvalRound();
    }
    setBildvalRound(bildvalRound);

    if (bildvalRound) words.push(bildvalRound.solution.name);

    // Unfocus next button
    nextButtonRef.current?.blur();

    // Track round event
    event(BILDVAL.ROUND_EVENT, { category: difficulty });

    setShowSolution(false);
  }, [difficulty, getBildvalRound, words]);

  // Get a new word on load
  useEffect(() => {
    getBildvalWords();
  }, [getBildvalWords]);

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
    if (passCount < BILDVAL.MAX_PASSES) {
      setPassCount(passCount + 1);
      getBildvalWords();
    }
  };

  const onNextRound = () => {
    if (round < BILDVAL.MAX_ROUNDS) {
      // Proceed to next round
      setRound((round) => round + 1);
      getBildvalWords();
    } else {
      // Track game event
      event(BILDVAL.GAME_EVENT, { category: difficulty });
      // Save final score
      saveScore(score);
      // Open game over modal
      onOpenGameOverModal();
    }
  };

  // Match the selected option with the solution
  const onMatch = (item: IKEAProduct) => {
    if (!bildvalRound) return;

    if (item.name === bildvalRound.solution.name) {
      // Update multiplier
      setMultiplier((multiplier) => Math.min(multiplier + 1, BILDVAL.MAX_MULTIPLIER));
      // Update score
      setScore((score) => score + BILDVAL.ROUND_SCORE * multiplier);
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
    <Container maxW="container.lg" px="0">
      <VStack alignItems="stretch" spacing={{ base: 4, md: 8 }}>
        <HStack justifyContent="center" spacing="4">
          <Heading textAlign="center" textTransform="capitalize" fontSize={{ base: "xl", md: "2xl" }}>
            {b("title_difficulty", { difficulty })}
          </Heading>
          <IconButton
            variant="outline"
            size="sm"
            isRound
            icon={<Text>?</Text>}
            aria-label={t("how_to_play")}
            onClick={onOpenHowToPlayModal}
          />
        </HStack>

        {round > 0 && (
          <HStack minW={{ base: "full", md: "500" }} justifyContent="space-between">
            <Tag size="lg" bg="blue.500" color="white">
              {t("rounds", { count: round, max: BILDVAL.MAX_ROUNDS })}
            </Tag>

            <Spacer />

            <Tag ref={multiplierRef} size="lg" bg="yellow.500" color="black">
              {multiplier}x
            </Tag>

            <Tag ref={scoreRef} size="lg" bg="black" color="white">
              {t("score", { score })}
            </Tag>
          </HStack>
        )}

        {/* Active game */}
        {(bildvalRound && round > 0 && round <= BILDVAL.MAX_ROUNDS && (
          <VStack alignItems="stretch" spacing="8">
            <Box px="6" py="2" bg="gray.50">
              <Text textAlign="center" fontSize={{ base: "2xl", md: "4xl" }} fontWeight="semibold">
                {b("question", { product: bildvalRound.solution.name })}
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

            <HStack justifyContent="space-between">
              {/* Skip */}
              <Button
                size="sm"
                variant="outline"
                alignSelf="center"
                onClick={onPass}
                isLoading={!bildvalRound}
                isDisabled={round > BILDVAL.MAX_ROUNDS || passCount >= BILDVAL.MAX_PASSES}
              >
                {t("pass_count", { count: BILDVAL.MAX_PASSES - passCount })}
              </Button>

              <Button
                size="sm"
                variant="outline"
                ref={nextButtonRef as Ref<HTMLButtonElement>}
                onClick={onNextRound}
                isDisabled={round > BILDVAL.MAX_ROUNDS || !showSolution}
                alignSelf="center"
              >
                {round === 0 ? t("start") : round === BILDVAL.MAX_ROUNDS ? t("finish") : t("next")}
              </Button>
            </HStack>
          </VStack>
        )) || <Spinner size="lg" />}

        <BildvalHowToPlayModal isOpen={isOpenHowToPlayModal} onClose={onCloseHowToPlayModal} />

        <GameOverModal
          isOpen={isOpenGameOverModal}
          onClose={onCloseGameOverModal}
          score={score}
          scores={scores}
          onCloseComplete={() => router.replace(PATH_BILDVAL)}
        />
      </VStack>
    </Container>
  );
}

export default BildvalGameMode;
