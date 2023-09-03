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

import { useTranslation } from "@/app/i18n/client";
import { GAMES } from "@/interfaces";

export const VadarjagWhatIsThisModal = ({ isOpen, onClose, ...props }: Omit<ModalProps, "children">) => {
  const { t } = useTranslation();
  const { t: v } = useTranslation(undefined, GAMES.VADARJAG);

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
          {v("what_is_this.title")}
        </ModalHeader>
        <ModalBody>
          <UnorderedList spacing="6">
            <ListItem>{v("what_is_this.desc.1")}</ListItem>

            <ListItem>{v("what_is_this.desc.2")}</ListItem>

            <Divider />

            <Text>{t("enjoy")}</Text>
          </UnorderedList>
        </ModalBody>
        <ModalFooter justifyContent="center">
          <Button onClick={onClose}>{t("close")}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
