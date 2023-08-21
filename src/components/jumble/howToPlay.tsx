import React from "react";
import {
  Button,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  UnorderedList,
} from "@chakra-ui/react";

import { JUMBLE } from "@/utils/constants";

export const JumbleHowToPlayModal = ({ isOpen, onClose, ...props }: Omit<ModalProps, "children">) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered closeOnEsc={false} closeOnOverlayClick={false} {...props}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontWeight="bold" textAlign="center">Jumble: How to play</ModalHeader>
        <ModalBody>
          <UnorderedList spacing="6">
            <ListItem>
              You will be given a scrambled IKEA product name. Unscramble the letters to guess the product.
            </ListItem>

            <ListItem>
              There are {JUMBLE.MAX_ROUNDS} rounds. Each round, you will be given a new product to guess.
            </ListItem>

            <ListItem>
              You have {JUMBLE.MAX_ATTEMPTS} attempts to guess the product in each round. The faster you guess, the more
              points you will score.
            </ListItem>

            <ListItem>
              If you are stuck, you can pass/skip the round. You have {JUMBLE.MAX_PASSES} passes per game.
            </ListItem>

            <ListItem>Enjoy!</ListItem>
          </UnorderedList>
        </ModalBody>
        <ModalFooter justifyContent="center">
          <Button onClick={onClose}>Let me play!</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
