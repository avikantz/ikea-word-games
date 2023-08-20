"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Button,
  HStack,
  Heading,
  Spacer,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";

import { IKEAJumbleWord, JUMBLE_MODE } from "@/interfaces";
import { useJumble } from "@/hooks/useJumble";
import { matchWords } from "@/utils/words";
import { IKEAProductCard, WordInput } from "@/components";
import { JUMBLE } from "@/utils/paths";

const MAX_ROUNDS = 2;
const MAX_MULTIPLIER = 5;
const MAX_PASSES = 3;
const MAX_ATTEMPTS = 3;

function JumbleGameMode({ params }: { params: { mode: string } }) {
  const router = useRouter();
  const [difficulty, setDifficulty] = useState<JUMBLE_MODE>();

  // Game state
  const [passCount, setPassCount] = useState<number>(0);
  const [round, setRound] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [multiplier, setMultiplier] = useState<number>(1);

  const [attempts, setAttempts] = useState<number>(0);
  const [success, setSuccess] = useState<boolean>(false);

  const [jumbleWord, setJumbleWord] = useState<IKEAJumbleWord>();

  const { getJumbleWord } = useJumble({ mode: difficulty });

  // Check difficulty param
  useEffect(() => {
    if (params.mode) {
      if (["easy", "medium", "hard", "insane"].includes(params.mode)) {
        setDifficulty(params.mode as JUMBLE_MODE);
      } else {
        alert("Invalid mode");
        router.replace(JUMBLE);
      }
    }
  }, [params.mode, router]);

  const getWords = useCallback(async () => {
    // Fetch new jumble word
    const jumbleWord = getJumbleWord();
    setJumbleWord(jumbleWord);
    setAttempts(0);
    setSuccess(false);
  }, [getJumbleWord]);

  // useEffect(() => {
  //   getWords();
  // }, [getWords]);

  const onMatch = (value: string) => {
    if (!jumbleWord) return;
    if (value.length !== jumbleWord.word.length) return;

    if (matchWords(value, jumbleWord.word)) {
      setSuccess(true);
      // Update multiplier
      setMultiplier((multiplier) => Math.min(multiplier + 1, MAX_MULTIPLIER));
      // Calculate score
      setScore((score) => {
        let roundScore = 10;
        if (attempts === 0) roundScore = 50;
        if (attempts === 1) roundScore = 20;
        if (attempts === 2) roundScore = 10;
        roundScore *= multiplier;
        return score + roundScore;
      });
    } else {
      setSuccess(false);
      // Reset attempts and multiplier
      setAttempts(attempts + 1);
      setMultiplier(1);
    }
  };

  const onPass = () => {
    if (passCount < MAX_PASSES) {
      setPassCount(passCount + 1);
      getWords();
    }
  };

  const onNextRound = () => {
    if (round < MAX_ROUNDS) {
      setRound((round) => round + 1);
      getWords();
    } else {
      alert(`Game over\n\nYour final is ${score}\n\nThanks for playing!`)
      router.replace(JUMBLE);
    }
  };

  return (
    <VStack spacing={{ base: 4, md: 8 }}>
      {round > 0 && (
        <HStack
          minW={{ base: "full", md: "500" }}
          justifyContent="space-between"
        >
          <Tag size="lg" bg="blue.500" color="white">
            Round {round} of {MAX_ROUNDS}
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
      {jumbleWord && round > 0 && round <= MAX_ROUNDS && (
        <VStack spacing={{ base: 4, md: 8 }}>
          <IKEAProductCard
            product={jumbleWord.product}
            showDesc={attempts > 0 || success}
            showImage={attempts > 1 || success}
            showName={attempts >= MAX_ATTEMPTS || success}
            isSuccess={success}
            isFailure={attempts >= MAX_ATTEMPTS && !success}
          >
            {attempts < MAX_ATTEMPTS && !success && (
              <Text fontSize="sm" color="gray.400">
                {attempts} of {MAX_ATTEMPTS} attempts
              </Text>
            )}
          </IKEAProductCard>

          <HStack spacing="8" px="6" py="2" rounded="md" bg="gray.50">
            {jumbleWord.shuffledWord.split("").map((w, i) => (
              <Text key={`word-${w}${i}`} fontSize="2xl" fontWeight="light">
                {w}
              </Text>
            ))}
          </HStack>

          <WordInput
            length={jumbleWord.word.length}
            targetValue={jumbleWord.word}
            onSubmit={onMatch}
            isDisabled={attempts >= MAX_ATTEMPTS || success}
          />

          <Button
            size="sm"
            variant="outline"
            onClick={onPass}
            isLoading={!jumbleWord}
            isDisabled={
              round > MAX_ROUNDS ||
              passCount >= MAX_PASSES ||
              success ||
              attempts > 3
            }
          >
            Pass ({MAX_PASSES - passCount})
          </Button>
        </VStack>
      )}

      {round === 0 && (
        <VStack
          rounded="md"
          p={{ base: 4, md: 8 }}
          bg="gray.50"
          maxW={{ base: "full", md: "md" }}
          spacing="4"
          textAlign="center"
        >
          <Heading as="h4" fontSize="lg">
            How to play
          </Heading>

          <Text>
            You will be given a scrambled IKEA product name. Unscramble the
            letters to guess the product.
          </Text>

          <Text>
            There are {MAX_ROUNDS} rounds. Each round, you will be given a new
            product to guess.
          </Text>

          <Text>
            You have {MAX_ATTEMPTS} attempts to guess the product in each round.
            The faster you guess, the more points you will score.
          </Text>

          <Text>
            If you are stuck, you can pass/skip the round. You have {MAX_PASSES}{" "}
            passes per game.
          </Text>

          <Text>Enjoy!</Text>
        </VStack>
      )}

      <Button onClick={onNextRound} isDisabled={round > MAX_ROUNDS}>
        {round === 0 ? "Start" : round === MAX_ROUNDS ? "Finish" : "Next"}
      </Button>
    </VStack>
  );
}

export default JumbleGameMode;
