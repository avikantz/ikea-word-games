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
  Image,
  PinInput,
  PinInputField,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";

import { IKEAJumbleWord } from "@/interfaces";
import { useJumble } from "@/hooks/useJumble";

export default function Home() {
  const [length, setLength] = useState<number>(6);

  const [jumbleWord, setJumbleWord] = useState<IKEAJumbleWord>();

  const [guess, setGuess] = useState<string>();
  const [attempts, setAttempts] = useState<number>(0);

  const firstPinInputField = useRef<HTMLInputElement>();

  const { getJumbleWord } = useJumble({ length });

  const getWords = useCallback(async () => {
    // Fetch new jumble word
    const jumbleWord = getJumbleWord();
    setJumbleWord(jumbleWord);
    setGuess("");
    setAttempts(0);
  }, [getJumbleWord]);

  useEffect(() => {
    getWords();
  }, [getWords]);

  const onGuessChange = (value: string) => {
    setGuess(value.toUpperCase());
    if (jumbleWord && value.length === jumbleWord.word.length) {
      setAttempts(attempts + 1);
      // TODO: compare
      if (jumbleWord.word.toUpperCase() !== value.toUpperCase()) {
        setGuess("");
        firstPinInputField?.current?.focus();
      }
    }
  };

  const onLengthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLength(Number(event.target.value));
    firstPinInputField?.current?.focus();
  };

  return (
    <main>
      <Box h="100vh">
        <Container>
          <VStack py="24" spacing="8">
            <Heading textAlign="center">IKEA Jumble</Heading>

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
                  type="alphanumeric"
                  isDisabled={!jumbleWord || guess === jumbleWord?.word || attempts >= 3}
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
              </HStack>
            )}

            {jumbleWord?.word && guess === jumbleWord.word && (
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

            {jumbleWord?.product && (attempts >= 3 || guess === jumbleWord?.word) && (
              <Card as="a" href={jumbleWord.product.url} target="_blank">
                <CardHeader>{jumbleWord.product.name}</CardHeader>
                <CardBody>
                  <Image
                    src={jumbleWord.product.image}
                    alt={jumbleWord.product.alt}
                    w="48"
                    h="48"
                    objectFit="cover"
                  />
                </CardBody>
                <CardFooter>
                  <Text fontSize="sm" color="gray.400">
                    {jumbleWord.product.desc}
                  </Text>
                </CardFooter>
              </Card>
            )}

            <HStack spacing="4">
              <Select
                size="sm"
                placeholder="Length"
                value={length}
                onChange={onLengthChange}
              >
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
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
