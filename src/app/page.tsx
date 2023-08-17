"use client";

import { useCallback, useEffect, useState } from "react";
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
  Text,
  VStack,
} from "@chakra-ui/react";
import { IKEAProduct } from "@/interfaces";

export default function Home() {
  const [word, setWord] = useState<string>();
  const [shuffledWord, setShuffledWord] = useState<string>();
  const [product, setProduct] = useState<IKEAProduct>();

  const [guess, setGuess] = useState<string>();
  const [attempts, setAttempts] = useState<number>(0);

  const getWords = useCallback(async () => {
    try {
      const response = await fetch("/api/jumble");
      const res: { word: string; data: IKEAProduct } = await response.json();
      setWord(res.word);
      setShuffledWord(
        res.word
          .split("")
          .sort(() => Math.random() - 0.5)
          .join("")
      );
      setProduct(res.data);
    } catch (error) {
      // ???
      setWord(undefined);
      setShuffledWord(undefined);
      setProduct(undefined);
    } finally {
      setGuess("");
      setAttempts(0);
    }
  }, []);

  useEffect(() => {
    getWords();
  }, [getWords]);

  const onGuessChange = (value: string) => {
    setGuess(value.toUpperCase());
    if (word && value.length === word.length) {
      setAttempts(attempts + 1);
    }
  };

  return (
    <main>
      <Box h="100vh">
        <Container>
          <VStack py="24" spacing="8">
            <Heading textAlign="center">IKEA Jumble</Heading>

            <HStack spacing="8" px="6" py="2" rounded="md" bg="gray.50">
              {shuffledWord?.split("").map((w, i) => (
                <Text key={`word-${w}${i}`} fontSize="2xl" fontWeight="light">
                  {w}
                </Text>
              ))}
            </HStack>

            {word && (
              <HStack>
                <PinInput
                  size="lg"
                  autoFocus
                  value={guess}
                  onChange={onGuessChange}
                  type="alphanumeric"
                  isDisabled={guess === word || attempts >= 3}
                >
                  {Array(word.length)
                    .fill(0)
                    .map((_, i) => (
                      <PinInputField textTransform="uppercase" key={i} />
                    ))}
                </PinInput>
              </HStack>
            )}

            {guess === word && (
              <Text textAlign="center" fontSize="xl" color="green.500">
                You got it!
              </Text>
            )}

            {guess !== word && attempts >= 3 && (
              <Text textAlign="center" fontSize="xl" color="red.500">
                Better luck next time!
              </Text>
            )}

            {attempts < 3 && (
              <Text textAlign="center" fontSize="sm" color="gray.400">
                {attempts} of 3 attempts
              </Text>
            )}

            {product && (attempts >= 3 || guess === word) && (
              <Card as="a" href={product.url} target="_blank">
                <CardHeader>{product.name}</CardHeader>
                <CardBody>
                  <Image
                    src={product.image}
                    alt={product.alt}
                    w="48"
                    h="48"
                    objectFit="cover"
                  />
                </CardBody>
                <CardFooter>
                  <Text fontSize="sm" color="gray.400">
                    {product.desc}
                  </Text>
                </CardFooter>
              </Card>
            )}

            <Button size="sm" variant="outline" onClick={getWords}>
              Reload
            </Button>
          </VStack>
        </Container>
      </Box>
    </main>
  );
}
