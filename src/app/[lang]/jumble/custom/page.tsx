"use client";

import { Ref, useCallback, useEffect, useRef, useState } from "react";
import { Button, Container, Divider, Heading, Select, Text, VStack } from "@chakra-ui/react";
import { event } from "nextjs-google-analytics";

import { IKEAJumbleWord, PageProps } from "@/interfaces";
import { useJumble } from "@/hooks/useJumble";
import { matchWords } from "@/utils/words";
import { IKEAProductCard, WordDisplay, WordInput } from "@/components";
import { JUMBLE } from "@/utils/constants";
import { useTranslation } from "@/app/i18n/client";

function JumbleGameCustom({ params: { lang } }: PageProps) {
  // Translations
  const { t } = useTranslation(lang);
  const { t: j } = useTranslation(lang, "jumble");

  // Refs
  const inputRef = useRef<HTMLInputElement>();
  const nextButtonRef = useRef<HTMLButtonElement>();

  // Game state
  const [guess, setGuess] = useState<string>("");

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

    // Track round event
    event(JUMBLE.ROUND_EVENT, { category: "custom" });

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
    <VStack alignItems={{ base: "stretch", md: "center" }} spacing={{ base: 4, md: 8 }}>
      <Heading textAlign="center" textTransform="capitalize" fontSize={{ base: "xl", md: "2xl" }}>
        {j("title_difficulty", { difficulty: t("custom") })}
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
              {t("attempts", { count: attempts, max: JUMBLE.MAX_ATTEMPTS })}
            </Text>
          )}
        </IKEAProductCard>
      )}

      {jumbleWord?.shuffledWord && <WordDisplay word={jumbleWord?.shuffledWord} guess={guess} />}

      {jumbleWord?.word && (
        <WordInput
          ref={inputRef as Ref<HTMLInputElement>}
          value={guess}
          setValue={setGuess}
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
        alignSelf="center"
      >
        {success || attempts >= JUMBLE.MAX_ATTEMPTS ? t("next") : t("pass_count", { count: "∞" })}
      </Button>

      <Container maxW="md">
        <Divider mb={{ base: 4, md: 8 }} />
        <Text color="gray.500" textAlign="center" fontSize="sm" mb="2">
          {t("size")}
        </Text>
        <Select
          maxW="32"
          mx="auto"
          aria-label={t("length")}
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
      </Container>
    </VStack>
  );
}

export default JumbleGameCustom;
