import React, { ReactNode } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Scores } from "@/interfaces";

interface GameOverModalProps extends Omit<ModalProps, "children"> {
  title?: string;
  score: number;
  scores?: Scores;
  desc?: string;
  buttonTitle?: string;
  children?: ReactNode;
}

export const GameOverModal = ({
  title,
  score,
  scores,
  desc,
  buttonTitle,
  children,
  isOpen,
  onClose,
  ...props
}: GameOverModalProps) => {
  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      isCentered
      closeOnEsc={false}
      closeOnOverlayClick={false}
      size={{ base: "full", md: "xl" }}
      scrollBehavior="inside"
      {...props}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontWeight="bold" textAlign="center">
          {title || "Game over!"}
        </ModalHeader>
        <ModalBody>
          <VStack
            w="full"
            rounded="md"
            textAlign="center"
            p={{ base: 4, md: 8 }}
            mb={{ base: 4, md: 8 }}
            bg="yellow.500"
          >
            <Text fontWeight="semibold" fontSize="sm" mb="-4">
              Final score
            </Text>
            <Text fontSize="5xl" fontWeight="bold">
              {score}
            </Text>

            {scores?.highscore && (
              <Text fontWeight="semibold">
                {scores?.highscore.value === score ? "New highscore!" : `Highscore ${scores.highscore.value}`}
              </Text>
            )}
          </VStack>

          <Text textAlign="center" fontSize="sm" color="gray.500">
            {desc || "Thanks for playing!"}
          </Text>

          {children}
        </ModalBody>
        <ModalFooter justifyContent="center">
          <Button onClick={onClose}>{buttonTitle || "Okay"}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
