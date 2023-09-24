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
import { useTranslation } from "@/app/i18n/client";

export const BildvalHowToPlayModal = ({ isOpen, onClose, ...props }: Omit<ModalProps, "children">) => {
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
          {t("bildval.how_to_play.title")}
        </ModalHeader>
        <ModalBody>
          <UnorderedList spacing="6">
            <ListItem>{t("bildval.how_to_play.desc.1")}</ListItem>

            <ListItem>{t("bildval.how_to_play.desc.2", { rounds: BILDVAL.MAX_ROUNDS })}</ListItem>

            <ListItem>{t("bildval.how_to_play.desc.3", { passes: BILDVAL.MAX_PASSES })}</ListItem>

            <Divider />

            <ListItem>{t("bildval.how_to_play.scoring", { points: BILDVAL.ROUND_SCORE })}</ListItem>

            <ListItem>{t("bildval.how_to_play.multiplier", { max: BILDVAL.MAX_MULTIPLIER })}</ListItem>

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
