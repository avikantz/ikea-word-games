"use client";

import React, { ReactNode } from "react";
import {
  Box,
  BoxProps,
  Button,
  Heading,
  LinkBox,
  LinkOverlay,
  Skeleton,
  SkeletonText,
  Spacer,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";

import { useTranslation } from "@/app/i18n/client";
import { PADDING } from "@/theme";

interface ModeCardProps extends BoxProps {
  title?: string;
  desc?: string;
  href?: string;
  buttonTitle?: string;
  isDisabled?: boolean;
  children?: ReactNode;
}

export const ModeCard = ({ title, desc, href, buttonTitle, isDisabled, children, ...props }: ModeCardProps) => {
  const { t } = useTranslation();
  return (
    <LinkBox
      p={PADDING.DEFAULT}
      minH={{ base: "15vh", md: "30vh" }}
      display="flex"
      flexDirection="column"
      gap="2"
      alignItems="flex-start"
      justifyContent="space-between"
      border="2px solid"
      borderColor="black"
      transition="all 0.2s ease"
      _hover={{
        borderColor: isDisabled ? "black" : "blue.500",
        cursor: isDisabled ? "not-allowed" : "pointer",
        boxShadow: isDisabled ? "none" : "blue-xl",
      }}
      opacity={isDisabled ? 0.5 : 1}
      {...props}
    >
      {!!title && (
        <Heading as="h4" fontSize={{ base: "md", md: "lg" }}>
          {title}
        </Heading>
      )}
      {!!desc && <Text color="gray.500">{desc}</Text>}
      {children}
      <Spacer />
      <LinkOverlay as={NextLink} prefetch={false} href={isDisabled ? "" : href}>
        <Button isDisabled={isDisabled}>{buttonTitle || t("play_title", { title })}</Button>
      </LinkOverlay>
    </LinkBox>
  );
};

export const ModeCardSkeleton = () => (
  <Box
    p={PADDING.DEFAULT}
    minH={{ base: "15vh", md: "30vh" }}
    display="flex"
    flexDirection="column"
    gap="2"
    alignItems="flex-start"
    justifyContent="space-between"
    border="2px solid"
    borderColor="black"
  >
    <Skeleton w="36" h="6" />
    <SkeletonText noOfLines={2} w="full" />
    <Spacer />
    <Skeleton w="24" h="12" rounded="full" />
  </Box>
);
