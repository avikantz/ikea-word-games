"use client";

import { useCallback, useEffect, useState } from "react";
import { Button, HStack, Select, Text, VStack } from "@chakra-ui/react";

import { IKEAJumbleWord } from "@/interfaces";
import { useJumble } from "@/hooks/useJumble";
import { matchWords } from "@/utils/words";
import { IKEAProductCard, WordInput } from "@/components";

function JumbleGame() {
  const [length, setLength] = useState<number>(6);

  const [jumbleWord, setJumbleWord] = useState<IKEAJumbleWord>();

  const [attempts, setAttempts] = useState<number>(0);
  const [success, setSuccess] = useState<boolean>(false);

  const { getJumbleWord } = useJumble({ length });

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

  const onLengthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLength(Number(event.target.value));
  };

  return (
    <VStack spacing={{ base: 4, md: 8 }}>
      <HStack spacing="4">
        <Select
          size="sm"
          value={length}
          onChange={onLengthChange}
        >
          {[4, 5, 6, 7, 8, 9, 10].map((l) => (
            <option key={`length-${l}`} value={l}>
              {l}
            </option>
          ))}
        </Select>

        <Button
          size="sm"
          variant="outline"
          onClick={getWords}
          isLoading={!jumbleWord}
        >
          Hit me!
        </Button>
      </HStack>

      {jumbleWord?.product && (
        <IKEAProductCard
          product={jumbleWord.product}
          showDesc={attempts > 0 || success}
          showImage={attempts > 1 || success}
          showName={attempts >= 3 || success}
        />
      )}

      {success && (
        <Text textAlign="center" fontSize="xl" color="green.500">
          You got it!
        </Text>
      )}

      {attempts >= 3 && !success && (
        <Text textAlign="center" fontSize="xl" color="red.500">
          Better luck next time!
        </Text>
      )}

      {attempts < 3 && !success && (
        <Text textAlign="center" fontSize="sm" color="gray.400">
          {attempts} of 3 attempts
        </Text>
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
    </VStack>
  );
}

export default JumbleGame;
