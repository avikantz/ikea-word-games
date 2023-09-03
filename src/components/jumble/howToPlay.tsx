"use client";

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
import { useTranslation } from "@/app/i18n/client";

export const JumbleHowToPlayModal = ({ isOpen, onClose, ...props }: Omit<ModalProps, "children">) => {
  const { t } = useTranslation();
  const { t: j } = useTranslation(undefined, "jumble");

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
          {j("how_to_play.title")}
        </ModalHeader>
        <ModalBody>
          <UnorderedList spacing="6">
            <ListItem>{j("how_to_play.desc.1")}</ListItem>

            <ListItem>{j("how_to_play.desc.2", { rounds: JUMBLE.MAX_ROUNDS })}</ListItem>

            <ListItem>{j("how_to_play.desc.3", { attempts: JUMBLE.MAX_ATTEMPTS })}</ListItem>

            <ListItem>{j("how_to_play.desc.4", { passes: JUMBLE.MAX_PASSES })}</ListItem>

            <Divider />

            <ListItem>{j("how_to_play.scoring")}</ListItem>

            <ListItem>
              {j("how_to_play.round_scores", {
                g0: JUMBLE.ROUND_SCORE_G0,
                g1: JUMBLE.ROUND_SCORE_G1,
                g2: JUMBLE.ROUND_SCORE_G2,
              })}
            </ListItem>

            <ListItem>{j("how_to_play.multiplier", { max: JUMBLE.MAX_MULTIPLIER })}</ListItem>

            <Text>{t("enjoy")}</Text>
          </UnorderedList>
        </ModalBody>
        <ModalFooter justifyContent="center">
          <Button onClick={onClose}>{t("let_me_play")}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
