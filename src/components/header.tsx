"use client";

import { useCallback, useEffect, useState } from "react";
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
  const [isNavSticky, setNavSticky] = useState<boolean>(false);
  const [prevScrollPos, setPrevScrollPos] = useState<number>(0);

  const handleScroll = useCallback(() => {
    const currentScrollPos = window.scrollY;
    // set state based on location info and scroll position, if scrolling down, hide nav, else show nav
    if (Math.abs(prevScrollPos - currentScrollPos) > 20) {
      setNavSticky(prevScrollPos - currentScrollPos > 20);
    }
    setPrevScrollPos(currentScrollPos);
  }, [prevScrollPos]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <Box
      as="header"
      position="sticky"
      transition="top 0.5s ease"
      top={isNavSticky ? 0 : "-72px"}
      bgColor="white"
      borderBottom="1px solid"
      borderBottomColor={isNavSticky ? "gray.200" : "transparent"}
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
