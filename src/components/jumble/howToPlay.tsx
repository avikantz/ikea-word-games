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

import { JUMBLE } from "@/utils/constants";

export const JumbleHowToPlayModal = ({ isOpen, onClose, ...props }: Omit<ModalProps, "children">) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered closeOnEsc={false} closeOnOverlayClick={false} {...props}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontWeight="bold" textAlign="center">
          Jumble: How to play
        </ModalHeader>
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
              points you will score. The game will reveal the description and image of the product as you use up your
              attempts.
            </ListItem>

            <ListItem>
              If you are stuck, you can pass/skip the round. You have {JUMBLE.MAX_PASSES} passes per game.
            </ListItem>

            <Divider />

            <ListItem>
              <strong>Scoring:</strong> Round score * multiplier.
            </ListItem>

            <ListItem>
              Round score is {JUMBLE.ROUND_SCORE_G0} for guessing without hints, {JUMBLE.ROUND_SCORE_G1} for guessing
              after the description is revealed, and {JUMBLE.ROUND_SCORE_G2} for guessing after the image is revealed.
            </ListItem>

            <ListItem>
              Multiplier increases by 1 each round if you pass, max {JUMBLE.MAX_MULTIPLIER}. If you fail, the
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
