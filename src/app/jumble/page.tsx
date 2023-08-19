"use client";

import { LegacyRef, useCallback, useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  HStack,
  Heading,
  IconButton,
  Image,
  PinInput,
  PinInputField,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";

import { IKEAJumbleWord } from "@/interfaces";
import { useJumble } from "@/hooks/useJumble";
import { matchCharacters, matchWords } from "@/utils/words";
import { IKEAProductCard } from "@/components";

export default function Home() {
  const [length, setLength] = useState<number>(6);

  const [jumbleWord, setJumbleWord] = useState<IKEAJumbleWord>();

  const [guess, setGuess] = useState<string>();
  const [attempts, setAttempts] = useState<number>(0);
  const [success, setSuccess] = useState<boolean>(false);

  const firstPinInputField = useRef<HTMLInputElement>();
  const matchButton = useRef<HTMLButtonElement>();

  const { getJumbleWord } = useJumble({ length });

  const getWords = useCallback(async () => {
    // Fetch new jumble word
    const jumbleWord = getJumbleWord();
    setJumbleWord(jumbleWord);
    setGuess("");
    setAttempts(0);
    setSuccess(false);
  }, [getJumbleWord]);

  useEffect(() => {
    getWords();
  }, [getWords]);

  const onGuessChange = (value: string) => {
    setGuess(value.toUpperCase());
  };

  const onGuessCompletion = (value: string) => {
    if (!jumbleWord) return;

    if (matchCharacters(value, jumbleWord.word)) {
      matchButton?.current?.focus();
    }
  };

  const onMatch = () => {
    if (!jumbleWord || !guess) return;
    if (guess.length !== jumbleWord.word.length) return;

    if (matchWords(guess, jumbleWord.word)) {
      setSuccess(true);
    } else {
      setAttempts(attempts + 1);
      setGuess("");
      firstPinInputField?.current?.focus();
    }
  };

  const onLengthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLength(Number(event.target.value));
    firstPinInputField?.current?.focus();
  };

  return (
    <main>
      <Box h="calc(100vh - 72px)">
        <Container>
          <VStack py="8" spacing="8">
            <Heading textAlign="center">Jumble</Heading>

            {jumbleWord?.product && (
              <IKEAProductCard
                product={jumbleWord.product}
                showName={attempts >= 3 || success}
                showDesc={attempts > 0}
                showImage={attempts > 1}
              />
            )}

            {success && (
              <Text textAlign="center" fontSize="xl" color="green.500">
                You got it!
              </Text>
            )}

            {guess !== jumbleWord?.word && attempts >= 3 && (
              <Text textAlign="center" fontSize="xl" color="red.500">
                Better luck next time!
              </Text>
            )}

            {attempts < 3 && (
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
              <HStack>
                <PinInput
                  size="lg"
                  autoFocus
                  value={guess}
                  onChange={onGuessChange}
                  onComplete={onGuessCompletion}
                  type="alphanumeric"
                  isDisabled={
                    !jumbleWord || guess === jumbleWord?.word || attempts >= 3
                  }
                  isInvalid={
                    guess?.length === jumbleWord.word.length &&
                    !matchCharacters(guess, jumbleWord.word)
                  }
                >
                  <PinInputField
                    ref={firstPinInputField as LegacyRef<HTMLInputElement>}
                    textTransform="uppercase"
                  />
                  {Array(jumbleWord?.word.length - 1)
                    .fill(0)
                    .map((_, i) => (
                      <PinInputField textTransform="uppercase" key={i} />
                    ))}
                </PinInput>
                <IconButton
                  ref={matchButton as LegacyRef<HTMLButtonElement>}
                  icon={<Text>⏎</Text>}
                  aria-label="Submit"
                  size="lg"
                  variant="outline"
                  onClick={onMatch}
                  isDisabled={
                    !jumbleWord || guess === jumbleWord?.word || attempts >= 3
                  }
                />
              </HStack>
            )}

            <HStack spacing="4">
              <Select
                size="sm"
                placeholder="Length"
                value={length}
                onChange={onLengthChange}
              >
                {[4, 5, 6, 7, 8, 9].map((l) => (
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
                Reload
              </Button>
            </HStack>
          </VStack>
        </Container>
      </Box>
    </main>
  );
}
