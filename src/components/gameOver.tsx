import React, { ReactNode } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Scores } from "@/interfaces";
import { useTranslation } from "@/app/i18n/client";

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
          <VStack w="full" textAlign="center" p={{ base: 4, md: 8 }} mb={{ base: 4, md: 8 }} bg="yellow.500">
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

          <Text textAlign="center" fontSize="sm" color="gray.500">
            {desc || t("thanks_for_playing")}
          </Text>

          {children}
        </ModalBody>
        <ModalFooter justifyContent="space-between">
          <Button autoFocus variant="outline" onClick={() => window.location.reload()}>
            {t("play_again")}
          </Button>
          <Button onClick={onClose}>{buttonTitle || t("okay")}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
