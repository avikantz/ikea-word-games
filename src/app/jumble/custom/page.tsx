"use client";

import { Ref, useCallback, useEffect, useRef, useState } from "react";
import { Button, Container, Divider, Heading, Select, Text, VStack } from "@chakra-ui/react";

import { IKEAJumbleWord } from "@/interfaces";
import { useJumble } from "@/hooks/useJumble";
import { matchWords } from "@/utils/words";
import { IKEAProductCard, WordDisplay, WordInput } from "@/components";
import { JUMBLE } from "@/utils/constants";

function JumbleGame() {
  // Refs
  const inputRef = useRef<HTMLInputElement>();
  const nextButtonRef = useRef<HTMLButtonElement>();

  // Game state
  const [attempts, setAttempts] = useState<number>(0);
  const [success, setSuccess] = useState<boolean>(false);

  const [length, setLength] = useState<number>(6);

  // Jumble words
  const [jumbleWord, setJumbleWord] = useState<IKEAJumbleWord>();
  const { getJumbleWord } = useJumble({ length });

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

  useEffect(() => {
    getWords();
  }, [getWords]);

  const onMatch = (value: string) => {
    if (!jumbleWord) return;
    if (value.length !== jumbleWord.word.length) return;

    if (matchWords(value, jumbleWord.word)) {
      setSuccess(true);

      // Focus next button
      nextButtonRef.current?.focus();
    } else {
      setSuccess(false);
      // Update attempts and set focus
      setAttempts((attempts) => {
        if (attempts === JUMBLE.MAX_ATTEMPTS - 1) {
          nextButtonRef.current?.focus();
        } else {
          inputRef.current?.focus();
        }
        return attempts + 1;
      });
    }
  };

  return (
    <VStack spacing={{ base: 4, md: 8 }}>
      <Heading textAlign="center" textTransform="capitalize">
        Jumble Custom
      </Heading>

      {jumbleWord?.product && (
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
      )}

      {jumbleWord?.shuffledWord && <WordDisplay word={jumbleWord?.shuffledWord} />}

      {jumbleWord?.word && (
        <WordInput
          ref={inputRef as Ref<HTMLInputElement>}
          length={jumbleWord.word.length}
          targetValue={jumbleWord.word}
          onSubmit={onMatch}
          isDisabled={attempts >= JUMBLE.MAX_ATTEMPTS || success}
        />
      )}

      <Button
        ref={nextButtonRef as Ref<HTMLButtonElement>}
        size="sm"
        variant="outline"
        onClick={getWords}
        isLoading={!jumbleWord}
      >
        {success || attempts >= JUMBLE.MAX_ATTEMPTS ? "Next" : "Pass (∞)"}
      </Button>

      <Container maxW="md">
        <Divider mb={{ base: 4, md: 8 }} />
        <Text color="gray.500" textAlign="center" fontSize="sm" mb="2">
          Size
        </Text>
        <Select
          maxW="32"
          mx="auto"
          aria-label="Length"
          onChange={(e) => setLength(parseInt(e.target.value))}
          value={length}
          isDisabled={!jumbleWord}
        >
          {[4, 5, 6, 7, 8, 9, 10].map((l) => (
            <option key={`length-${l}`} value={l}>
              {l}
            </option>
          ))}
        </Select>
        {/* <Slider aria-label="Length" onChange={(value) => setLength(value)} value={length} min={4} max={10} step={1}>
          {[4, 5, 6, 7, 8, 9, 10].map((l) => (
            <SliderMark mt="3" ml="-1" fontSize="sm" key={`length-${l}`} value={l}>
              {l}
            </SliderMark>
          ))}
          <SliderTrack bg="gray.100" />
          <SliderThumb boxSize="5" bg="black" />
        </Slider> */}
      </Container>
    </VStack>
  );
}

export default JumbleGame;
