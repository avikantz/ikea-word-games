"use client";

import React, {
  Dispatch,
  LegacyRef,
  MouseEventHandler,
  SetStateAction,
  forwardRef,
  useEffect,
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
  VStack,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useAnimate } from "framer-motion";
import Keyboard from "react-simple-keyboard";
import { matchCharacters, getDisabledLettersForWord } from "@/utils/words";
import { PADDING } from "@/theme";
import Icon from "./Icon";

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
  const keyboardRef = useRef();

  const isMobile = useBreakpointValue({ base: true, md: false }, { fallback: "md" });
  const {
    isOpen: isKeyboardVisible,
    onToggle: toggleKeyboard,
    onOpen: showKeyboard,
    onClose: hideKeyboard,
  } = useDisclosure();

  const disabledLetters = getDisabledLettersForWord(targetValue.removeAccents());

  // Input target length has reached
  const onCompletion = (value: string) => {
    // Auto focus button if valid
    if (matchCharacters(value, targetValue)) {
      setInvalid(false);

      // Auto focus submit button
      buttonRef?.current?.focus();
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
    // @ts-expect-error
    keyboardRef.current?.setInput(value);

    if (value.length < length) {
      setInvalid(false);
    }
    if (value.length === length) {
      onCompletion(value);
    }
  };

  const onKeyboardInputChange = (input: string, _event?: MouseEvent) => {
    // Filter out disabled letters
    const invalidLetters = new RegExp(`[${disabledLetters}]+$`, "g");
    const filteredInput = input.replace(invalidLetters, "");

    if (invalidLetters.test(input)) {
      // Jiggle input if invalid
      animateContainer(containerRef.current, { translate: [0, "-5px", 0, "5px", 0] }, { duration: 0.1, repeat: 3 });
      // @ts-expect-error
      keyboardRef.current?.setInput(filteredInput);
      return;
    }

    if (input.length > length) {
      // Jiggle input if longer than target length (feedback for extra presses)
      animateContainer(containerRef.current, { translate: [0, "-5px", 0, "5px", 0] }, { duration: 0.1, repeat: 3 });
      // @ts-expect-error
      keyboardRef.current?.setInput(input.slice(0, length));
      return;
    }

    const value = input.toUpperCase();
    setValue(value);

    if (value.length === length) {
      onCompletion(value);
    }
  };

  const onSubmit = (event?: Event) => {
    event?.preventDefault();

    if (value.length !== length || !matchCharacters(value, targetValue)) {
      // Jiggle input if invalid
      animateContainer(containerRef.current, { translate: [0, "-5px", 0, "5px", 0] }, { duration: 0.1, repeat: 3 });
      return;
    }
    _onSubmit(value);
    setValue("");
    // @ts-expect-error
    keyboardRef.current?.setInput("");
  };

  const onKeyboardKeyPress = (button: string, _event?: MouseEvent) => {
    if (button === "{enter}") {
      onSubmit(_event);
    }
  };

  // Show keyboard on mobile devices
  useEffect(() => {
    if (isMobile) {
      showKeyboard();
    } else {
      hideKeyboard();
    }
  }, [hideKeyboard, isMobile, showKeyboard]);

  return (
    <VStack w={isKeyboardVisible ? "full" : "auto"} spacing={PADDING.DEFAULT}>
      <HStack ref={containerRef}>
        <IconButton
          icon={<Icon name={isKeyboardVisible ? "physical-input" : "keyboard"} />}
          aria-label="Toggle keyboard"
          size="lg"
          variant="outline"
          onClick={toggleKeyboard}
          isDisabled={isDisabled}
          className="hover:text-white"
        />

        {isKeyboardVisible ? (
          // Render "fake" input if OSK is visible (default on mobile)
          <Input
            size="lg"
            value={value}
            type="text"
            isDisabled
            isInvalid={isInvalid}
            _disabled={{ opacity: 1, color: "black" }}
            _invalid={{ borderColor: "red.500", _focus: { boxShadow: "red" } }}
            textTransform="uppercase"
            textAlign="center"
            letterSpacing="8px"
          />
        ) : (
          // Fancier pin Input on for keyboard users
          <PinInput
            size="lg"
            autoFocus
            value={value}
            onChange={onPinInputChange}
            type="alphanumeric"
            isDisabled={isDisabled}
            isInvalid={isInvalid}
          >
            {/* Focus on first field */}
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
          icon={<Icon name="return" />}
          aria-label="Submit"
          size="lg"
          variant="outline"
          onClick={onSubmit as unknown as MouseEventHandler<HTMLButtonElement>}
          isDisabled={isDisabled}
        />
      </HStack>

      {/* Virtual keyboard */}
      {isKeyboardVisible && (
        <Keyboard
          keyboardRef={(ref) => (keyboardRef.current = ref)}
          onChange={onKeyboardInputChange}
          onKeyPress={onKeyboardKeyPress}
          theme="hg-theme-default hg-layout-default customKeyboardTheme"
          buttonTheme={[
            {
              buttons: "Q W E R T Y U I O P A S D F G H J K L Z X C V B N M {bksp} {enter}",
              class: "customButton",
            },
            {
              buttons: "{bksp}",
              class: "backspace",
            },
            {
              buttons: "{enter}",
              class: "submitButton",
            },
          ]}
          buttonAttributes={[
            {
              attribute: "disabled",
              value: "true",
              buttons: disabledLetters.replace(/./g, "$& "),
            },
          ]}
          layout={{
            default: ["Q W E R T Y U I O P", "A S D F G H J K L", "{bksp} Z X C V B N M {enter}"],
          }}
        />
      )}
    </VStack>
  );
});
WordInput.displayName = "WordInput";

export const WordInputSkeleton = () => (
  <HStack justifyContent="center" w={{ base: "full", md: "auto" }}>
    <Skeleton w="12" h="12" rounded="full" />
    {Array(6)
      .fill(0)
      .map((_, i) => (
        <Skeleton key={`wi-skeleton-${i}`} w="12" h="12" />
      ))}
    <Skeleton w="12" h="12" rounded="full" />
  </HStack>
);
