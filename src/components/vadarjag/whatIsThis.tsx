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

export const VadarjagWhatIsThisModal = ({ isOpen, onClose, ...props }: Omit<ModalProps, "children">) => {
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
          {t("vadarjag.what_is_this.title")}
        </ModalHeader>
        <ModalBody>
          <UnorderedList spacing="6">
            <ListItem>{t("vadarjag.what_is_this.desc.1")}</ListItem>

            <ListItem>{t("vadarjag.what_is_this.desc.2")}</ListItem>

            <Divider />

            <Text>{t("common.enjoy")}</Text>
          </UnorderedList>
        </ModalBody>
        <ModalFooter justifyContent="center">
          <Button onClick={onClose}>{t("common.close")}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
