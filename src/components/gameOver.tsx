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

interface GameOverModalProps extends Omit<ModalProps, "children"> {
  title?: string;
  score: number;
  desc?: string;
  buttonTitle?: string;
  children?: ReactNode;
}

export const GameOverModal = ({
  title,
  score,
  desc,
  buttonTitle,
  children,
  isOpen,
  onClose,
  ...props
}: GameOverModalProps) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered closeOnEsc={false} closeOnOverlayClick={false} {...props}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontWeight="bold" textAlign="center">
          {title || "Game over"}
        </ModalHeader>
        <ModalBody>
          <VStack w="full" rounded="md" textAlign="center" p={{ base: 4, md: 8 }} mb={{ base: 4, md: 8 }} bg="yellow.500">
            <Text fontSize="5xl" fontWeight="bold">
              {score}
            </Text>
            <Text fontWeight="semibold">Final score</Text>
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
