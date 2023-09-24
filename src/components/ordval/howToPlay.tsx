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

import { ORDVAL } from "@/utils/constants";
import { useTranslation } from "@/app/i18n/client";

export const OrdvalHowToPlayModal = ({ isOpen, onClose, ...props }: Omit<ModalProps, "children">) => {
  const { t } = useTranslation();

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
          {t("ordval.how_to_play.title")}
        </ModalHeader>
        <ModalBody>
          <UnorderedList spacing="6">
            <ListItem>{t("ordval.how_to_play.desc.1")}</ListItem>

            <ListItem>{t("ordval.how_to_play.desc.2", { rounds: ORDVAL.MAX_ROUNDS })}</ListItem>

            <ListItem>{t("ordval.how_to_play.desc.3", { passes: ORDVAL.MAX_PASSES })}</ListItem>

            <Divider />

            <ListItem>{t("ordval.how_to_play.scoring", { points: ORDVAL.ROUND_SCORE })}</ListItem>

            <ListItem>{t("ordval.how_to_play.multiplier", { max: ORDVAL.MAX_MULTIPLIER })}</ListItem>

            <Text>{t("common.enjoy")}</Text>
          </UnorderedList>
        </ModalBody>
        <ModalFooter justifyContent="center">
          <Button onClick={onClose}>{t("common.let_me_play")}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
