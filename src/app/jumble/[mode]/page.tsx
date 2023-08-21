"use client";

import { useCallback, useEffect, useState } from "react";
import { Button, HStack, Heading, IconButton, Spacer, Tag, Text, VStack, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

import { IKEAJumbleWord, JUMBLE_MODE } from "@/interfaces";
import { useJumble } from "@/hooks/useJumble";
import { matchWords } from "@/utils/words";
import { IKEAProductCard, WordInput } from "@/components";
import { PATH_JUMBLE } from "@/utils/paths";
import { JUMBLE } from "@/utils/constants";
import { JumbleHowToPlayModal } from "@/components/jumble";

function JumbleGameMode({ params }: { params: { mode: string } }) {
  const router = useRouter();
  const [difficulty, setDifficulty] = useState<JUMBLE_MODE>();

  // Modals
  const {
    isOpen: isOpenHowToPlayModal,
    onOpen: onOpenHowToPlayModal,
    onClose: onCloseHowToPlayModal,
  } = useDisclosure();

  // Game state
  const [passCount, setPassCount] = useState<number>(0);
  const [round, setRound] = useState<number>(1);
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
  }, [getJumbleWord]);

  useEffect(() => {
    getWords();
    onOpenHowToPlayModal();
  }, [getWords, onOpenHowToPlayModal]);

  const onMatch = (value: string) => {
    if (!jumbleWord) return;
    if (value.length !== jumbleWord.word.length) return;

    if (matchWords(value, jumbleWord.word)) {
      setSuccess(true);
      // Update multiplier
      setMultiplier((multiplier) => Math.min(multiplier + 1, JUMBLE.MAX_MULTIPLIER));
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
    if (passCount < JUMBLE.MAX_PASSES) {
      setPassCount(passCount + 1);
      getWords();
    }
  };

  const onNextRound = () => {
    if (round < JUMBLE.MAX_ROUNDS) {
      setRound((round) => round + 1);
      getWords();
    } else {
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
          <Tag size="lg" bg="blue.500" color="white">
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

      <JumbleHowToPlayModal isOpen={isOpenHowToPlayModal} onClose={onCloseHowToPlayModal} />

      <Button onClick={onNextRound} isDisabled={round > JUMBLE.MAX_ROUNDS}>
        {round === 0 ? "Start" : round === JUMBLE.MAX_ROUNDS ? "Finish" : "Next"}
      </Button>
    </VStack>
  );
}

export default JumbleGameMode;
