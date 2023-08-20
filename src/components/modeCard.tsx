"use client";

import React, { ReactNode } from "react";
import {
  BoxProps,
  Button,
  Heading,
  LinkBox,
  LinkOverlay,
  Spacer,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";

interface ModeCardProps extends BoxProps {
  title?: string;
  desc?: string;
  href?: string;
  buttonTitle?: string;
  children?: ReactNode;
}

export const ModeCard = ({
  title,
  desc,
  href,
  buttonTitle,
  children,
  ...props
}: ModeCardProps) => {
  return (
    <LinkBox
      p={{ base: 4, md: 8 }}
      minH={{ base: "15vh", md: "30vh" }}
      display="flex"
      flexDirection="column"
      gap="2"
      alignItems="flex-start"
      justifyContent="space-between"
      border="2px solid"
      borderColor="black"
      transition="all 0.2s ease"
      _hover={{ border: "8px solid", borderColor: "blue.500" }}
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
      <LinkOverlay as={NextLink} href={href}>
        <Button rounded="none">{buttonTitle || `Play ${title}`}</Button>
      </LinkOverlay>
    </LinkBox>
  );
};
