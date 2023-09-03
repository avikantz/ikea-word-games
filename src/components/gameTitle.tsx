"use client";

import React from "react";
import { Heading, HeadingProps, HStack, IconButton, StackProps, Text } from "@chakra-ui/react";

import { useTranslation } from "@/app/i18n/client";

interface GameTitleProps extends HeadingProps {
  title: string;
  stackProps?: StackProps;
  infoTitle?: string;
  onInfoClick?: () => void;
}

export const GameTitle = ({ title, stackProps, infoTitle, onInfoClick, ...props }: GameTitleProps) => {
  const { t } = useTranslation();
  return (
    <HStack justifyContent="center" spacing="4" {...stackProps}>
      <Heading textAlign="center" textTransform="capitalize" fontSize={{ base: "xl", md: "2xl" }} {...props}>
        {title}
      </Heading>
      {onInfoClick && (
        <IconButton
          variant="outline"
          size="sm"
          isRound
          icon={<Text>?</Text>}
          aria-label={infoTitle ?? t("how_to_play")}
          onClick={onInfoClick}
        />
      )}
    </HStack>
  );
};
