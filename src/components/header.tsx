"use client";

import {
  Box,
  Container,
  HStack,
  Heading,
  Link,
  Spacer,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { JUMBLE } from "@/utils/paths";

export const Header = () => {
  return (
    <Box
      as="header"
      position="sticky"
      transition="top 0.5s ease"
      top="0"
      bgColor="white"
      borderBottom="1px solid"
      borderBottomColor="gray.200"
      zIndex={100}
      display="flex"
      alignItems="center"
      h="72px"
    >
      <Container as="nav" h="full" maxW="container.xl" px={{ base: 3, sm: 6 }}>
        <HStack h="full" alignItems="center" spacing={{ base: 2, md: 4 }}>
          <Heading fontSize="lg">IKEA Word Games</Heading>

          <Link as={NextLink} href={JUMBLE}>
            Jumble
          </Link>

          <Spacer />
        </HStack>
      </Container>
    </Box>
  );
};
