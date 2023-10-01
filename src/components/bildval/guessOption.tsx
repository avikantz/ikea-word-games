"use client";

import React, { MouseEventHandler, useEffect, useState } from "react";
import { useAnimate } from "framer-motion";
import ConfettiExplosion from "react-confetti-explosion";
import { Box, BoxProps, Center, Collapse, Image, Link, Skeleton, useBreakpointValue } from "@chakra-ui/react";

import { IKEAProduct } from "@/interfaces";
import { CONFETTI_COLORS } from "@/theme";
import { useAudio } from "@/hooks/useAudio";

interface BildvalGuessOptionProps extends BoxProps {
  guess: IKEAProduct;
  solution?: IKEAProduct;
  showSolution?: boolean;
}

export const BildvalGuessOption = ({
  guess,
  solution,
  showSolution,
  onClick: _onClick,
  ...props
}: BildvalGuessOptionProps) => {
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
        // Hide Confetti with a delay of 500 ms
        setTimeout(() => setShowConfetti(false), 500);
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
  };

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
      _hover={
        showSolution
          ? undefined
          : { md: { bg: "white", boxShadow: "blue-xl", borderColor: "blue.500", transform: "scale(1.025)" } }
      }
      _focus={showSolution ? undefined : { boxShadow: "blue-xl", borderColor: "blue.500" }}
      borderColor={showSolution ? (solution?.id === guess.id ? "green.500" : "red.500") : "black"}
      boxShadow={showSolution ? (solution?.id === guess.id ? greenShadow : redShadow) : undefined}
      position="relative"
      {...props}
    >
      <Image
        fallback={<Skeleton w="full" h="full" />}
        src={guess.pImage ?? guess.image}
        alt={guess.desc}
        objectFit="contain"
        w="full"
        h={{ base: "25vh", md: "72", lg: "96" }}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        pointerEvents="none"
        blendMode="darken"
      />
      {showConfetti && (
        <Center position="absolute" top="0" bottom="0" left="0" right="0" zIndex="2">
          <ConfettiExplosion colors={CONFETTI_COLORS} height="80vh" />
        </Center>
      )}
      <Box position="absolute" bottom="0" left="0" right="0">
        <Collapse in={showSolution}>
          <Box p={{ base: 2, md: 4 }} bg="white">
            <Link href={guess.url} target="_blank" rel="noopener" fontWeight="bold" color="blue.500">
              {guess.name}
            </Link>
          </Box>
        </Collapse>
      </Box>
    </Box>
  );
};

export const BildvalGuessOptionSkeleton = () => (
  <Box border="2px solid" borderColor="black" position="relative" w="full" h={{ base: "25vh", md: "72", lg: "96" }}>
    <Skeleton w="full" h="full" />
  </Box>
);
