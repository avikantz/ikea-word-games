import React from "react";
import {
  Button,
  ListItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  UnorderedList,
} from "@chakra-ui/react";

import { BILDVAL } from "@/utils/constants";

export const BildvalHowToPlayModal = ({ isOpen, onClose, ...props }: Omit<ModalProps, "children">) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered closeOnEsc={false} closeOnOverlayClick={false} {...props}>
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
