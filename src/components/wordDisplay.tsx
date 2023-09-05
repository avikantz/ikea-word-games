"use client";

import React from "react";
import { HStack, StackProps, Text, TextProps, useBreakpointValue } from "@chakra-ui/react";

interface WordDisplayProps extends TextProps {
  word: string;
  guess?: string;
  stackProps?: StackProps;
}

export const WordDisplay = ({ word, guess, stackProps, ...props }: WordDisplayProps) => {
  const isMobile = useBreakpointValue({ base: true, md: false }, { fallback: "md" });

  return (
    <HStack w={{ base: "full", md: "auto" }} justifyContent="center" spacing="8" px="6" py="2" bg="gray.50">
      {isMobile ? (
        <Text as="span" textAlign="center" fontSize="xl" letterSpacing="8px" {...props}>
          {word.split("").map((w, i) => (
            <Text as="span" key={`word-${w}${i}`}>
              {w}
            </Text>
          ))}
        </Text>
      ) : (
        word.split("").map((w, i) => (
          <Text as="span" key={`word-${w}${i}`} fontSize="2xl" fontWeight="light" {...props}>
            {w}
          </Text>
        ))
      )}
    </HStack>
  );
};
