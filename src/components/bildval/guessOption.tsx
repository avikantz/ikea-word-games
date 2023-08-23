import React, { MouseEventHandler, useEffect, useState } from "react";
import { useAnimate } from "framer-motion";
import ConfettiExplosion from "react-confetti-explosion";

import { IKEAProduct } from "@/interfaces";
import { Box, BoxProps, Center, Image } from "@chakra-ui/react";

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
  const [isSuccess, setSuccess] = useState(false);

  const [buttonRef, animateButton] = useAnimate();

  const onClick: MouseEventHandler<HTMLDivElement> = (event) => {
    if (isLoaded) {
      // Check if correct
      if (solution?.id === guess.id) {
        // Show confetti
        setSuccess(true);
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
          scale: [1, 1.4, 1],
        },
        {
          duration: 1,
        },
      );
    }
  }, [showSolution, guess, solution, animateButton, buttonRef]);

  return (
    <Box
      ref={buttonRef}
      as="button"
      border="2px solid"
      borderColor="black"
      onClick={onClick}
      cursor={isLoaded ? "pointer" : "progress"}
      transition="all 0.1s ease"
      _hover={{ base: {}, md: { boxShadow: "blue-xl", borderColor: "blue.500", transform: "scale(1.05)" } }}
      _focus={{ boxShadow: "blue-xl", borderColor: "blue.500" }}
      position="relative"
      {...props}
    >
      {isSuccess && (
        <Center position="absolute" top="0" bottom="0" left="0" right="0">
          <ConfettiExplosion colors={["#FFDB00", "#008AFF", "#111111"]} height="80vh" />
        </Center>
      )}
      <Image
        src={guess.image}
        alt={guess.desc}
        objectFit="cover"
        w="full"
        h={{ base: "20vh", md: "30vh" }}
        onLoad={() => setLoaded(true)}
      />
    </Box>
  );
};
