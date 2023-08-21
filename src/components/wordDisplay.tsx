import React from "react";
import { HStack, StackProps, Text, TextProps, useBreakpointValue } from "@chakra-ui/react";

interface WordDisplayProps extends TextProps {
  word: string;
  stackProps?: StackProps;
}

export const WordDisplay = ({ word, stackProps, ...props }: WordDisplayProps) => {
  const isMobile = useBreakpointValue({ base: true, md: false }, { fallback: "md" });

  return (
    <HStack
      w={{ base: "full", md: "auto" }}
      justifyContent="center"
      spacing="8"
      px="6"
      py="2"
      rounded="md"
      bg="gray.50"
    >
      {isMobile ? (
        <Text textAlign="center" fontSize="xl" letterSpacing="8px" {...props}>
          {word}
        </Text>
      ) : (
        word.split("").map((w, i) => (
          <Text key={`word-${w}${i}`} fontSize="2xl" fontWeight="light" {...props}>
            {w}
          </Text>
        ))
      )}
    </HStack>
  );
};
