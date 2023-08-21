"use client";

import React, { ChangeEventHandler, LegacyRef, MouseEventHandler, useRef, useState } from "react";
import { HStack, IconButton, Input, PinInput, PinInputField, Text, useBreakpointValue } from "@chakra-ui/react";
import { useAnimate } from "framer-motion";

import { matchCharacters } from "@/utils/words";

interface WordInputProps {
  length: number;
  targetValue: string;
  onCompletion?: (value: string) => void;
  onSubmit: (value: string) => void;
  isDisabled?: boolean;
}

export const WordInput = ({
  length,
  targetValue,
  onCompletion: _onCompletion,
  onSubmit: _onSubmit,
  isDisabled,
}: WordInputProps) => {
  const [value, setValue] = useState<string>("");
  const [isInvalid, setInvalid] = useState<boolean>(false);

  const [containerRef, animateContainer] = useAnimate();
  const inputRef = useRef<HTMLInputElement>();
  const buttonRef = useRef<HTMLButtonElement>();

  const isMobile = useBreakpointValue({ base: true, md: false }, { fallback: "md" });

  // Input target length has reached
  const onCompletion = (value: string) => {
    // Auto focus button if valid
    if (matchCharacters(value, targetValue)) {
      setInvalid(false);

      // Auto focus button on desktop
      if (!isMobile) {
        buttonRef?.current?.focus();
      }
    } else {
      setInvalid(true);
      // Jiggle input if invalid
      animateContainer(containerRef.current, { translate: [0, "-5px", 0, "5px", 0] }, { duration: 0.1, repeat: 3 });
    }
    // Trigger parent onCompletion
    _onCompletion?.(value);
  };

  const onPinInputChange = (value: string) => {
    setValue(value.toUpperCase());

    if (value.length < length) {
      setInvalid(false);
    }
    if (value.length === length) {
      onCompletion(value);
    }
  };

  const onInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value.toUpperCase();
    setValue(value);

    if (value.length < length) {
      setInvalid(false);
    }
    if (value.length === length) {
      onCompletion(value);
    }
  };

  const onSubmit: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();

    if (value.length !== length || !matchCharacters(value, targetValue)) {
      // Jiggle input if invalid
      animateContainer(containerRef.current, { translate: [0, "-5px", 0, "5px", 0] }, { duration: 0.1, repeat: 3 });
      return;
    }

    setValue("");
    inputRef?.current?.focus();

    _onSubmit(value);
  };

  return (
    <HStack ref={containerRef}>
      {/* Render basic input on mobile due to space constraints */}
      {isMobile ? (
        <Input
          size="lg"
          autoFocus
          value={value}
          onChange={onInputChange}
          type="text"
          isDisabled={isDisabled}
          isInvalid={isInvalid}
          _invalid={{ borderColor: "red.500", _focus: { boxShadow: "red" } }}
          maxLength={length}
          ref={inputRef as LegacyRef<HTMLInputElement>}
          textTransform="uppercase"
          textAlign="center"
          letterSpacing="8px"
        />
      ) : (
        <PinInput
          size="lg"
          autoFocus
          value={value}
          onChange={onPinInputChange}
          type="alphanumeric"
          isDisabled={isDisabled}
          isInvalid={isInvalid}
        >
          <PinInputField ref={inputRef as LegacyRef<HTMLInputElement>} textTransform="uppercase" />
          {Array(length - 1)
            .fill(0)
            .map((_, i) => (
              <PinInputField textTransform="uppercase" key={i} />
            ))}
        </PinInput>
      )}

      <IconButton
        ref={buttonRef as LegacyRef<HTMLButtonElement>}
        icon={<Text>⏎</Text>}
        aria-label="Submit"
        size="lg"
        variant="outline"
        onClick={onSubmit}
        isDisabled={isDisabled}
        _focus={{ bg: "blue.100" }}
      />
    </HStack>
  );
};
