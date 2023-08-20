"use client";

import { useCallback, useEffect, useState } from "react";
import { Button, HStack, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

import { IKEAJumbleWord, JUMBLE_MODE } from "@/interfaces";
import { useJumble } from "@/hooks/useJumble";
import { matchWords } from "@/utils/words";
import { IKEAProductCard, WordInput } from "@/components";
import { JUMBLE } from "@/utils/paths";

function JumbleGameMode({ params }: { params: { mode: string } }) {
  const router = useRouter();
  const [difficulty, setDifficulty] = useState<JUMBLE_MODE>();

  const [jumbleWord, setJumbleWord] = useState<IKEAJumbleWord>();

  const [attempts, setAttempts] = useState<number>(0);
  const [success, setSuccess] = useState<boolean>(false);

  const { getJumbleWord } = useJumble({ mode: difficulty });

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

  useEffect(() => {
    getWords();
  }, [getWords]);

  const onMatch = (value: string) => {
    if (!jumbleWord) return;
    if (value.length !== jumbleWord.word.length) return;

    if (matchWords(value, jumbleWord.word)) {
      setSuccess(true);
    } else {
      setSuccess(false);
      setAttempts(attempts + 1);
    }
  };

  return (
    <VStack spacing={{ base: 4, md: 8 }}>
      {jumbleWord?.product && (
        <IKEAProductCard
          product={jumbleWord.product}
          showDesc={attempts > 0 || success}
          showImage={attempts > 1 || success}
          showName={attempts >= 3 || success}
          isSuccess={success}
          isFailure={attempts >= 3 && !success}
        >
          {attempts < 3 && !success && (
            <Text fontSize="sm" color="gray.400">
              {attempts} of 3 attempts
            </Text>
          )}
        </IKEAProductCard>
      )}

      <HStack spacing="8" px="6" py="2" rounded="md" bg="gray.50">
        {jumbleWord?.shuffledWord?.split("").map((w, i) => (
          <Text key={`word-${w}${i}`} fontSize="2xl" fontWeight="light">
            {w}
          </Text>
        ))}
      </HStack>

      {jumbleWord?.word && (
        <WordInput
          length={jumbleWord.word.length}
          targetValue={jumbleWord.word}
          onSubmit={onMatch}
          isDisabled={attempts >= 3 || success}
        />
      )}

      <Button
        size="sm"
        variant="outline"
        onClick={getWords}
        isLoading={!jumbleWord}
      >
        Reload
      </Button>
    </VStack>
  );
}

export default JumbleGameMode;
