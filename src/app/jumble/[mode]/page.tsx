"use client";

import { Ref, useCallback, useEffect, useRef, useState } from "react";
import { Button, HStack, Heading, IconButton, Spacer, Tag, Text, VStack, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useAnimate } from "framer-motion";

import { IKEAProductCard, WordDisplay, WordInput } from "@/components";
import { JumbleHowToPlayModal } from "@/components/jumble";
import { IKEAJumbleWord, JUMBLE_MODE } from "@/interfaces";
import { useJumble } from "@/hooks/useJumble";
import { matchWords } from "@/utils/words";
import { PATH_JUMBLE } from "@/utils/paths";
import { JUMBLE } from "@/utils/constants";

function JumbleGameMode({ params }: { params: { mode: string } }) {
  const router = useRouter();
  const [difficulty, setDifficulty] = useState<JUMBLE_MODE>();

  // Modals
  const {
    isOpen: isOpenHowToPlayModal,
    onOpen: onOpenHowToPlayModal,
    onClose: onCloseHowToPlayModal,
  } = useDisclosure();

  // Refs
  const inputRef = useRef<HTMLInputElement>();
  const nextButtonRef = useRef<HTMLButtonElement>();
  const [roundRef, animateRoundContainer] = useAnimate();

  // Game state
  const [passCount, setPassCount] = useState<number>(0);
  const [round, setRound] = useState<number>(1);
  const [score, setScore] = useState<number>(0);
  const [multiplier, setMultiplier] = useState<number>(1);

  const [attempts, setAttempts] = useState<number>(0);
  const [success, setSuccess] = useState<boolean>(false);

  // Jumble words
  const [jumbleWord, setJumbleWord] = useState<IKEAJumbleWord>();

  const { getJumbleWord } = useJumble({ mode: difficulty });

  // Check difficulty param
  useEffect(() => {
    if (params.mode) {
      if (["easy", "medium", "hard", "insane"].includes(params.mode)) {
        setDifficulty(params.mode as JUMBLE_MODE);
      } else {
        alert("Invalid mode");
        router.replace(PATH_JUMBLE);
      }
    }
  }, [params.mode, router]);

  const getWords = useCallback(async () => {
    // Fetch new jumble word
    const jumbleWord = getJumbleWord();
    setJumbleWord(jumbleWord);

    setAttempts(0);
    setSuccess(false);

    // Focus input after delay
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  }, [getJumbleWord]);

  // Get a new word on load
  useEffect(() => {
    getWords();
  }, [getWords]);

  const onMatch = (value: string) => {
    if (!jumbleWord) return;
    if (value.length !== jumbleWord.word.length) return;

    if (matchWords(value, jumbleWord.word)) {
      setSuccess(true);
      // Update multiplier
      setMultiplier((multiplier) => Math.min(multiplier + 1, JUMBLE.MAX_MULTIPLIER));
      // Calculate score
      setScore((score) => {
        // TODO: refactor this
        let roundScore = 10;
        if (attempts === 0) roundScore = 20;
        if (attempts === 1) roundScore = 10;
        if (attempts === 2) roundScore = 5;
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
          nextButtonRef.current?.focus();
        } else {
          inputRef.current?.focus();
        }
        return attempts + 1;
      });
      setMultiplier(1);
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
        animateRoundContainer(
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
      // TODO: add modal
      alert(`Game over\n\nYour final is ${score}\n\nThanks for playing!`);
      router.replace(PATH_JUMBLE);
    }
  };

  return (
    <VStack spacing={{ base: 4, md: 8 }}>
      <HStack spacing="4">
        <Heading textAlign="center" textTransform="capitalize">
          Jumble {difficulty}
        </Heading>
        <IconButton
          variant="outline"
          isRound
          icon={<Text>?</Text>}
          aria-label="How to play"
          onClick={onOpenHowToPlayModal}
        />
      </HStack>

      {round > 0 && (
        <HStack minW={{ base: "full", md: "500" }} justifyContent="space-between">
          <Tag ref={roundRef} size="lg" bg="blue.500" color="white">
            Round {round} of {JUMBLE.MAX_ROUNDS}
          </Tag>

          <Spacer />

          <Tag size="lg" bg="yellow.500" color="black">
            {multiplier}x
          </Tag>

          <Tag size="lg" bg="black" color="white">
            Score {score}
          </Tag>
        </HStack>
      )}

      {/* Active game */}
      {jumbleWord && round > 0 && round <= JUMBLE.MAX_ROUNDS && (
        <VStack spacing={{ base: 4, md: 8 }}>
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
                {attempts} of {JUMBLE.MAX_ATTEMPTS} attempts
              </Text>
            )}
          </IKEAProductCard>

          <WordDisplay word={jumbleWord.shuffledWord} />

          <WordInput
            ref={inputRef as Ref<HTMLInputElement>}
            length={jumbleWord.word.length}
            targetValue={jumbleWord.word}
            onSubmit={onMatch}
            isDisabled={attempts >= JUMBLE.MAX_ATTEMPTS || success}
          />

          <Button
            size="sm"
            variant="outline"
            onClick={onPass}
            isLoading={!jumbleWord}
            isDisabled={round > JUMBLE.MAX_ROUNDS || passCount >= JUMBLE.MAX_PASSES || success || attempts > 3}
          >
            Pass ({JUMBLE.MAX_PASSES - passCount})
          </Button>
        </VStack>
      )}

      <Button
        size="sm"
        variant="outline"
        ref={nextButtonRef as Ref<HTMLButtonElement>}
        onClick={onNextRound}
        isDisabled={round > JUMBLE.MAX_ROUNDS}
      >
        {round === 0 ? "Start" : round === JUMBLE.MAX_ROUNDS ? "Finish" : "Next"}
      </Button>

      <JumbleHowToPlayModal
        isOpen={isOpenHowToPlayModal}
        onClose={onCloseHowToPlayModal}
        onCloseComplete={() => inputRef.current?.focus()}
      />
    </VStack>
  );
}

export default JumbleGameMode;
