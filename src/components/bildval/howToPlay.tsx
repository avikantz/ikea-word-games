import React from "react";
import {
  Button,
  Divider,
  ListItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Text,
  UnorderedList,
} from "@chakra-ui/react";

import { BILDVAL } from "@/utils/constants";

export const BildvalHowToPlayModal = ({ isOpen, onClose, ...props }: Omit<ModalProps, "children">) => {
  return (
    <Modal
      size={{ base: "full", md: "2xl" }}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
      closeOnEsc={false}
      closeOnOverlayClick={false}
      {...props}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontWeight="bold" textAlign="center">
          Bildval: How to play
        </ModalHeader>
        <ModalBody>
          <UnorderedList spacing="6">
            <ListItem>
              You will be given an IKEA product name. Pick the picture that best identifies the product.
            </ListItem>

            <ListItem>
              There are {BILDVAL.MAX_ROUNDS} rounds. Each round, you will be given a new name to identify.
            </ListItem>

            <ListItem>
              If you are stuck, you can pass/skip the round. You have {BILDVAL.MAX_PASSES} passes per game.
            </ListItem>

            <Divider />

            <ListItem>
              <strong>Scoring:</strong> {BILDVAL.ROUND_SCORE} points per round * multiplier.
            </ListItem>

            <ListItem>
              Multiplier increases by 1 each round if you pass, max {BILDVAL.MAX_MULTIPLIER}. If you fail, the
              multiplier resets to 1.
            </ListItem>

            <Text>Enjoy!</Text>
          </UnorderedList>
        </ModalBody>
        <ModalFooter justifyContent="center">
          <Button onClick={onClose}>Let me play!</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
