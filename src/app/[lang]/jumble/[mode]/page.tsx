"use client";

import { Ref, useCallback, useEffect, useRef, useState } from "react";
import { Button, HStack, Spacer, Text, VStack, useDisclosure, Skeleton, Box } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useAnimate } from "framer-motion";
import { event } from "nextjs-google-analytics";

import {
  GameContainer,
  GameMultiplier,
  GameOverModal,
  GameRound,
  GameScore,
  GameTitle,
  IKEAProductCard,
  IKEAProductCardSkeleton,
  WordDisplay,
  WordInput,
  WordInputSkeleton,
} from "@/components";
import { JumbleHowToPlayModal } from "@/components/jumble";
import { IKEAJumbleWord, GAME_MODE, ModePageProps, GAMES } from "@/interfaces";
import { useJumble } from "@/hooks/useJumble";
import { matchWords } from "@/utils/words";
import { PATH_JUMBLE, getLocalizedPath } from "@/utils/paths";
import { JUMBLE } from "@/utils/constants";
import { useScores } from "@/hooks/useScores";
import { useTranslation } from "@/app/i18n/client";
import { useEffectTimeout } from "@/hooks/useEffectTimeout";
import { PADDING } from "@/theme";

function JumbleGameMode({ params: { mode, lang } }: ModePageProps) {
  const router = useRouter();
  const [difficulty, setDifficulty] = useState<GAME_MODE>("easy");

  // Translations
  const { t } = useTranslation(lang);

  // Modals
  const {
    isOpen: isOpenHowToPlayModal,
    onOpen: onOpenHowToPlayModal,
    onClose: onCloseHowToPlayModal,
  } = useDisclosure();

  const { isOpen: isOpenGameOverModal, onOpen: onOpenGameOverModal, onClose: onCloseGameOverModal } = useDisclosure();

  // Refs
  const containerRef = useRef<HTMLDivElement>();
  const inputRef = useRef<HTMLInputElement>();
  const nextButtonRef = useRef<HTMLButtonElement>();
  const [roundRef, animateRound] = useAnimate();
  const [multiplierRef, animateMultiplier] = useAnimate();
  const [scoreRef, animateScore] = useAnimate();

  // Game state
  const words = useRef<string[]>([]).current;
  const [guess, setGuess] = useState<string>("");

  const [passCount, setPassCount] = useState<number>(0);
  const [round, setRound] = useState<number>(1);
  const [score, setScore] = useState<number>(0);
  const [multiplier, setMultiplier] = useState<number>(1);

  const [attempts, setAttempts] = useState<number>(0);
  const [success, setSuccess] = useState<boolean>(false);

  // Scoring
  const { scores, saveScore } = useScores({ game: GAMES.JUMBLE, mode: difficulty });

  // Jumble words
  const [jumbleWord, setJumbleWord] = useState<IKEAJumbleWord>();

  const { getJumbleWord } = useJumble({ mode: difficulty });

  // Check difficulty param
  useEffect(() => {
    if (mode) {
      if (["easy", "medium", "hard", "insane"].includes(mode)) {
        setDifficulty(mode as GAME_MODE);
      } else {
        alert("Invalid mode");
        router.replace(PATH_JUMBLE);
      }
    }
  }, [mode, router]);

  const getWords = useCallback(async () => {
    // Fetch new jumble word
    let jumbleWord = getJumbleWord();
    // Prevent existing words from being repeated
    while (jumbleWord && words.includes(jumbleWord.word)) {
      jumbleWord = getJumbleWord();
    }
    setJumbleWord(jumbleWord);

    if (jumbleWord) words.push(jumbleWord.word);

    setAttempts(0);
    setSuccess(false);

    // Track round event
    event(JUMBLE.ROUND_EVENT, { category: difficulty });

    // Scroll game container in view
    containerRef.current?.scrollIntoView({ behavior: "smooth" });

    // Focus input after delay
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  }, [difficulty, getJumbleWord, words]);

  // Get a new word on load after delay
  useEffectTimeout(
    () => {
      getWords();
    },
    [getWords],
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

  const onMatch = (value: string) => {
    if (!jumbleWord) return;
    if (value.length !== jumbleWord.word.length) return;

    if (matchWords(value, jumbleWord.word)) {
      setSuccess(true);
      // Update multiplier
      setMultiplier((multiplier) => Math.min(multiplier + 1, JUMBLE.MAX_MULTIPLIER));
      // Calculate score
      setScore((score) => {
        let roundScore = 0;
        if (attempts === 0) roundScore = JUMBLE.ROUND_SCORE_G0;
        if (attempts === 1) roundScore = JUMBLE.ROUND_SCORE_G1;
        if (attempts === 2) roundScore = JUMBLE.ROUND_SCORE_G2;
        roundScore *= multiplier;
        return score + roundScore;
      });

      // Focus next button
      nextButtonRef.current?.focus();
    } else {
      setSuccess(false);
      // Update attempts and reset multiplier
      setAttempts((attempts) => {
        if (attempts === JUMBLE.MAX_ATTEMPTS - 1) {
          setMultiplier(1);
          nextButtonRef.current?.focus();
        } else {
          inputRef.current?.focus();
        }
        return attempts + 1;
      });
    }
  };

  const onPass = () => {
    if (passCount < JUMBLE.MAX_PASSES) {
      setPassCount(passCount + 1);
      getWords();
    }

    inputRef.current?.focus();
  };

  const onNextRound = () => {
    if (round < JUMBLE.MAX_ROUNDS) {
      if (success || attempts >= JUMBLE.MAX_ATTEMPTS) {
        // Proceed to next round
        setRound((round) => round + 1);
        getWords();
      } else {
        // Cannot proceed to next round
        animateRound(
          roundRef.current,
          {
            scale: [1, 1.2, 1, 1.2, 1],
            rotate: [0, 10, 0, -10, 0],
          },
          {
            duration: 0.15,
            repeat: 3,
          },
        );
      }
    } else {
      // Track game event
      event(JUMBLE.GAME_EVENT, { category: difficulty });
      // Save final score
      saveScore(score);
      // Open game over modal
      onOpenGameOverModal();
    }
  };

  return (
    <Box>
      <GameTitle
        title={t("jumble.title_difficulty", { difficulty: t(difficulty) })}
        onInfoClick={onOpenHowToPlayModal}
      />

      <GameContainer
        shouldSnap={!success || (attempts <= JUMBLE.MAX_ATTEMPTS && !success)}
        ref={containerRef as Ref<HTMLDivElement>}
      >
        {round > 0 && (
          <HStack minW={{ base: "full", md: "500" }} justifyContent="space-between">
            <GameRound ref={roundRef} round={round} maxRounds={JUMBLE.MAX_ROUNDS} />

            <Spacer />

            <GameMultiplier ref={multiplierRef} multiplier={multiplier} />

            <GameScore ref={scoreRef} score={score} />
          </HStack>
        )}

        {/* Active game */}
        {(jumbleWord && round > 0 && round <= JUMBLE.MAX_ROUNDS && (
          <VStack alignItems={{ base: "stretch", md: "center" }} spacing={PADDING.LG}>
            <IKEAProductCard
              product={jumbleWord.product}
              showDesc={attempts > 0 || success}
              showImage={attempts > 1 || success}
              showName={attempts >= JUMBLE.MAX_ATTEMPTS || success}
              isSuccess={success}
              isFailure={attempts >= JUMBLE.MAX_ATTEMPTS && !success}
            >
              {attempts < JUMBLE.MAX_ATTEMPTS && !success && (
                <Text fontSize="sm" color="gray.400">
                  {t("common.attempts", { count: attempts, max: JUMBLE.MAX_ATTEMPTS })}
                </Text>
              )}
            </IKEAProductCard>

            <WordDisplay word={jumbleWord.shuffledWord} guess={guess} />

            <WordInput
              ref={inputRef as Ref<HTMLInputElement>}
              value={guess}
              setValue={setGuess}
              length={jumbleWord.word.length}
              targetValue={jumbleWord.word}
              onSubmit={onMatch}
              isDisabled={attempts >= JUMBLE.MAX_ATTEMPTS || success}
            />
          </VStack>
        )) || (
          <VStack alignItems={{ base: "stretch", md: "center" }} spacing={PADDING.LG}>
            <IKEAProductCardSkeleton />

            <Skeleton w="96" h="52px" />

            <WordInputSkeleton />
          </VStack>
        )}

        <HStack justifyContent="space-between">
          <Button
            variant="outline"
            onClick={onPass}
            isLoading={!jumbleWord}
            isDisabled={
              round > JUMBLE.MAX_ROUNDS || passCount >= JUMBLE.MAX_PASSES || success || attempts > JUMBLE.MAX_ATTEMPTS
            }
          >
            {t("common.pass_count", { count: JUMBLE.MAX_PASSES - passCount })}
          </Button>

          <Button
            variant="outline"
            ref={nextButtonRef as Ref<HTMLButtonElement>}
            onClick={onNextRound}
            isDisabled={round > JUMBLE.MAX_ROUNDS && (success || attempts >= JUMBLE.MAX_ATTEMPTS)}
            alignSelf="center"
          >
            {round === 0 ? t("common.start") : round === JUMBLE.MAX_ROUNDS ? t("common.finish") : t("common.next")}
          </Button>
        </HStack>

        <Spacer display={{ base: "flex", md: "none" }} />
      </GameContainer>

      <JumbleHowToPlayModal
        isOpen={isOpenHowToPlayModal}
        onClose={onCloseHowToPlayModal}
        onCloseComplete={() => inputRef.current?.focus()}
      />

      <GameOverModal
        isOpen={isOpenGameOverModal}
        onClose={onCloseGameOverModal}
        score={score}
        scores={scores}
        onCloseComplete={() => router.replace(getLocalizedPath(PATH_JUMBLE, lang))}
      />
    </Box>
  );
}

export default JumbleGameMode;
