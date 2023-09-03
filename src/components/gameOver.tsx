"use client";

import React, { ReactNode } from "react";
import {
  Button,
  Divider,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";

import { Scores } from "@/interfaces";
import { useTranslation } from "@/app/i18n/client";
import { PADDING } from "@/theme";
import { BuyMeACoffeeButton } from "./coffeeButton";
import { SocialShareButtons } from "./socialShares";

interface GameOverModalProps extends Omit<ModalProps, "children"> {
  title?: string;
  score: number;
  scores?: Scores;
  desc?: string;
  buttonTitle?: string;
  children?: ReactNode;
}

export const GameOverModal = ({
  title,
  score,
  scores,
  desc,
  buttonTitle,
  children,
  isOpen,
  onClose,
  ...props
}: GameOverModalProps) => {
  const { t } = useTranslation();

  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      isCentered
      closeOnEsc={false}
      closeOnOverlayClick={false}
      size={{ base: "full", md: "xl" }}
      scrollBehavior="inside"
      {...props}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontWeight="bold" textAlign="center">
          {title || t("game_over")}
        </ModalHeader>
        <ModalBody>
          <VStack w="full" textAlign="center" p={PADDING.DEFAULT} mb={PADDING.DEFAULT} bg="yellow.500">
            <Text fontWeight="semibold" fontSize="sm" mb="-4">
              {t("final_score")}
            </Text>
            <Text fontSize="5xl" fontWeight="bold">
              {score}
            </Text>

            {scores?.highscore && (
              <Text fontWeight="semibold">
                {score >= scores?.highscore.value
                  ? t("new_highscore")
                  : t("highscore", { score: scores?.highscore.value })}
              </Text>
            )}
          </VStack>

          <Text textAlign="center" fontSize="lg" color="gray.500">
            {desc || t("thanks_for_playing")}
          </Text>

          {children}

          <Divider my="4" />

          <SocialShareButtons
            iconSize="24"
            size="sm"
            iconColor="black"
            bgColor="white"
            stackProps={{ gap: 2, my: 2 }}
          />

          <Text textAlign="center" fontSize="sm" color="gray.500">
            {t("share")}
          </Text>
        </ModalBody>

        <ModalFooter>
          <Stack
            w="full"
            direction={{ base: "column", md: "row" }}
            spacing={{ base: 4, md: 2 }}
            justifyContent="space-between"
          >
            <BuyMeACoffeeButton />

            <HStack justifyContent="space-between">
              <Button variant="outline" onClick={onClose}>
                {buttonTitle || t("close")}
              </Button>

              <Button autoFocus onClick={() => window.location.reload()}>
                {t("play_again")}
              </Button>
            </HStack>
          </Stack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
