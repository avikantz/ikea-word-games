"use client";

import React, {
  ChangeEventHandler,
  Dispatch,
  KeyboardEventHandler,
  LegacyRef,
  MouseEventHandler,
  SetStateAction,
  forwardRef,
  useRef,
  useState,
} from "react";
import {
  HStack,
  IconButton,
  Input,
  PinInput,
  PinInputField,
  Skeleton,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useAnimate } from "framer-motion";

import { matchCharacters } from "@/utils/words";

interface WordInputProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  length: number;
  targetValue: string;
  onCompletion?: (value: string) => void;
  onSubmit: (value: string) => void;
  isDisabled?: boolean;
}

export const WordInput = forwardRef<HTMLInputElement, WordInputProps>((props, inputRef) => {
  const { value, setValue, length, targetValue, onCompletion: _onCompletion, onSubmit: _onSubmit, isDisabled } = props;

  const [isInvalid, setInvalid] = useState<boolean>(false);

  const [containerRef, animateContainer] = useAnimate();
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
    _onSubmit(value);
    setValue("");
  };

  const onInputKeyUp: KeyboardEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault();

    if (event.key !== "Enter") return;

    if (value.length !== length || !matchCharacters(value, targetValue)) {
      // Jiggle input if invalid
      animateContainer(containerRef.current, { translate: [0, "-5px", 0, "5px", 0] }, { duration: 0.1, repeat: 3 });
      return;
    }

    setValue("");

    _onSubmit(value);
  };

  return (
    <HStack justifyContent="center" w={{ base: "full", md: "auto" }} ref={containerRef}>
      {isMobile ? (
        // Render basic input on mobile due to space constraints
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
          // Support enter key submission
          onKeyUp={onInputKeyUp}
        />
      ) : (
        // Fancier Pin Input on desktop
        <PinInput
          size="lg"
          autoFocus
          value={value}
          onChange={onPinInputChange}
          type="alphanumeric"
          isDisabled={isDisabled}
          isInvalid={isInvalid}
        >
          <PinInputField ref={inputRef as LegacyRef<HTMLInputElement>} textTransform="uppercase" rounded="none" />
          {Array(length - 1)
            .fill(0)
            .map((_, i) => (
              <PinInputField textTransform="uppercase" key={i} rounded="none" />
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
      />
    </HStack>
  );
});
WordInput.displayName = "WordInput";

export const WordInputSkeleton = () => (
  <HStack justifyContent="center" w={{ base: "full", md: "auto" }}>
    {Array(7)
      .fill(0)
      .map((_, i) => (
        <Skeleton key={`wi-skeleton-${i}`} w="12" h="12" />
      ))}
  </HStack>
);
