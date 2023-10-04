"use client";

import React, { MouseEventHandler, useEffect, useState } from "react";
import { useAnimate } from "framer-motion";
import ConfettiExplosion from "react-confetti-explosion";
import { Box, BoxProps, Center, Image, Link, Skeleton, Text, useBreakpointValue } from "@chakra-ui/react";

import { IKEAProduct } from "@/interfaces";
import { CONFETTI_COLORS } from "@/theme";
import { useAudio } from "@/hooks/useAudio";

interface OrdvalGuessOptionProps extends BoxProps {
  guess: IKEAProduct;
  solution?: IKEAProduct;
  showSolution?: boolean;
}

export const OrdvalGuessOption = ({
  guess,
  solution,
  showSolution,
  onClick: _onClick,
  ...props
}: OrdvalGuessOptionProps) => {
  const [isLoaded, setLoaded] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const [buttonRef, animateButton] = useAnimate();
  const { playFailureAudio, playSuccessAudio } = useAudio();

  const redShadow = useBreakpointValue({ base: "red-md", md: "red-xl" }, { fallback: "md" });
  const greenShadow = useBreakpointValue({ base: "green-md", md: "green-xl" }, { fallback: "md" });

  const onClick: MouseEventHandler<HTMLDivElement> = (event) => {
    // Nothing if solution is shown
    if (showSolution) return;

    if (isLoaded) {
      // Check if correct
      if (solution?.id === guess.id) {
        // Show confetti
        setShowConfetti(true);
        // Play success audio
        playSuccessAudio?.();
        // Hide Confetti Overlay with a delay of 1500 ms
        setTimeout(() => setShowConfetti(false), 1500);
      } else {
        // Jiggle button
        animateButton(
          buttonRef.current,
          {
            scale: [1, 1.1, 1, 1.1, 1],
            rotate: [0, 5, 0, -5, 0],
          },
          {
            duration: 0.1,
            repeat: 3,
          },
        );
        // Play failure audio
        playFailureAudio?.();
      }

      _onClick?.(event);
    }
  }

  useEffect(() => {
    if (showSolution && solution?.id === guess.id) {
      // Scale up button
      animateButton(
        buttonRef.current,
        {
          scale: [1, 1.2, 1],
        },
        {
          duration: 0.5,
        },
      );
    }
  }, [showSolution, guess, solution, animateButton, buttonRef]);

  return (
    <Box
      ref={buttonRef}
      as="button"
      border="2px solid"
      onClick={onClick}
      cursor={showSolution ? "default" : isLoaded ? "pointer" : "progress"}
      transition="all 0.1s ease"
      _hover={showSolution ? undefined : { md: { boxShadow: "blue-xl", borderColor: "blue.500" } }}
      _focus={showSolution ? undefined : { boxShadow: "blue-xl", borderColor: "blue.500" }}
      borderColor={showSolution ? (solution?.id === guess.id ? "green.500" : "red.500") : "black"}
      boxShadow={showSolution ? (solution?.id === guess.id ? greenShadow : redShadow) : undefined}
      opacity={showSolution ? (solution?.id === guess.id ? 1 : 0.5) : undefined}
      position="relative"
      w="full"
      h={{ base: "28", md: "44", lg: "52" }}
      {...props}
    >
      <Image
        fallback={<Skeleton w="full" h="full" />}
        src={guess.pImage ?? guess.image}
        alt={guess.desc}
        objectFit="contain"
        w="full"
        filter='auto' blur={showSolution ? '0px' : '8px'}
        h={{ base: "16", md: "32", lg: "36" }}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        pointerEvents="none"
        blendMode="darken"
      />
      {showConfetti && (
        <Center position="absolute" top="0" bottom="0" left="0" right="0">
          <ConfettiExplosion colors={CONFETTI_COLORS} height="80vh" />
        </Center>
      )}

      <Text
        as={showSolution ? Link : undefined}
        href={showSolution ? guess.url : undefined}
        target="_blank"
        textAlign="center"
        letterSpacing="wider"
        fontSize={{ base: "xl", md: "2xl" }}
        fontWeight={showSolution && solution?.id === guess.id ? "bold" : "normal"}
      >
        {guess.name}
      </Text>
    </Box>
  );
};

export const OrdvalGuessOptionSkeleton = () => (
  <Center border="2px solid" borderColor="black" w="full" h={{ base: "16", md: "32", lg: "40" }}>
    <Skeleton w="32" h="37px" />
  </Center>
);
