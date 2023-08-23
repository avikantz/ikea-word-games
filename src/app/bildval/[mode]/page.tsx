"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button, HStack, Heading, Spacer, Tag, Text, VStack, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useAnimate } from "framer-motion";

import { GameOverModal } from "@/components";
import { BildvalRound, IKEAProduct, JUMBLE_MODE } from "@/interfaces";
import { PATH_BILDVAL } from "@/utils/paths";
import { BILDVAL } from "@/utils/constants";
import { useScores } from "@/hooks/useScores";
import { useBildval } from "@/hooks/useBildval";

function BildvalGameMode({ params }: { params: { mode: string } }) {
  const router = useRouter();
  const [difficulty, setDifficulty] = useState<JUMBLE_MODE>("easy");

  // Modals
  const {
    isOpen: isOpenHowToPlayModal,
    onOpen: onOpenHowToPlayModal,
    onClose: onCloseHowToPlayModal,
  } = useDisclosure();

  const { isOpen: isOpenGameOverModal, onOpen: onOpenGameOverModal, onClose: onCloseGameOverModal } = useDisclosure();

  // Refs
  const [multiplierRef, animateMultiplier] = useAnimate();
  const [scoreRef, animateScore] = useAnimate();

  // Game state
  const words = useRef<string[]>([]).current;

  const [passCount, setPassCount] = useState<number>(0);
  const [round, setRound] = useState<number>(1);
  const [score, setScore] = useState<number>(0);
  const [multiplier, setMultiplier] = useState<number>(1);

  const [success, setSuccess] = useState<boolean>(false);

  // Scoring
  const { scores, saveScore } = useScores({ game: "bildval", mode: difficulty });

  // Bildval round
  const [bildvalRound, setBildvalRound] = useState<BildvalRound>();

  const { getBildvalRound } = useBildval({ mode: difficulty });

  // Check difficulty param
  useEffect(() => {
    if (params.mode) {
      if (["easy", "medium", "hard", "insane"].includes(params.mode)) {
        setDifficulty(params.mode as JUMBLE_MODE);
      } else {
        alert("Invalid mode");
        router.replace(PATH_BILDVAL);
      }
    }
  }, [params.mode, router]);

  const getBildvalWords = useCallback(async () => {
    // Fetch new bildval round
    let bildvalRound = getBildvalRound();
    // Prevent existing solutions from being repeated
    while (bildvalRound && words.includes(bildvalRound.solution.name)) {
      bildvalRound = getBildvalRound();
    }
    setBildvalRound(bildvalRound);

    if (bildvalRound) words.push(bildvalRound.solution.name);

    setSuccess(false);
  }, [getBildvalRound, words]);

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
      // Save final score
      saveScore(score);
      // Open game over modal
      onOpenGameOverModal();
    }
  };

  // TODO: match
  const onMatch = (item: IKEAProduct) => {
    if (!bildvalRound) return;

    if (item.name === bildvalRound.solution.name) {
      // Update multiplier
      setMultiplier((multiplier) => Math.min(multiplier + 1, BILDVAL.MAX_MULTIPLIER));
      // Calculate score
      setScore((score) => {
        // TODO: refactor this
        return score + 10 * multiplier;
      });
    } else {
      // Reset multiplier
      setMultiplier(1);
    }

    onNextRound();
  };

  return (
    <VStack alignItems={{ base: "stretch", md: "center" }} spacing={{ base: 4, md: 8 }}>
      <HStack spacing="4">
        <Heading textAlign="center" textTransform="capitalize">
          Bildval {difficulty}
        </Heading>
      </HStack>

      {round > 0 && (
        <HStack minW={{ base: "full", md: "500" }} justifyContent="space-between">
          <Tag size="lg" bg="blue.500" color="white">
            Round {round} of {BILDVAL.MAX_ROUNDS}
          </Tag>

          <Spacer />

          <Tag ref={multiplierRef} size="lg" bg="yellow.500" color="black">
            {multiplier}x
          </Tag>

          <Tag ref={scoreRef} size="lg" bg="black" color="white">
            Score {score}
          </Tag>
        </HStack>
      )}

      {/* Active game */}
      {bildvalRound && round > 0 && round <= BILDVAL.MAX_ROUNDS && (
        <VStack alignItems="stretch" spacing={{ base: 4, md: 8 }}>
          {/* TODO: Product name */}
          <Text>{bildvalRound.solution.name}</Text>

          {/* TODO: Guess options */}
          {bildvalRound.guesses.map((guess) => (
            <Button key={guess.name} onClick={() => onMatch(guess)}>
              {guess.desc}
            </Button>
          ))}

          {/* Skip */}
          <Button
            size="sm"
            variant="outline"
            alignSelf="center"
            onClick={onPass}
            isLoading={!bildvalRound}
            isDisabled={round > BILDVAL.MAX_ROUNDS || passCount >= BILDVAL.MAX_PASSES || success}
          >
            Pass ({BILDVAL.MAX_PASSES - passCount})
          </Button>
        </VStack>
      )}

      <GameOverModal
        isOpen={isOpenGameOverModal}
        onClose={onCloseGameOverModal}
        score={score}
        scores={scores}
        onCloseComplete={() => router.replace(PATH_BILDVAL)}
      />
    </VStack>
  );
}

export default BildvalGameMode;
