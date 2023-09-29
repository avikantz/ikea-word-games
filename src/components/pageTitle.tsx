"use client";

import React, { ReactNode } from "react";
import { Box, Center, Heading, HeadingProps, Stack, StackProps, Text, VStack } from "@chakra-ui/react";

import { PADDING } from "@/theme";

interface PageTitleProps extends HeadingProps {
  title: string;
  desc?: string;
  children?: ReactNode;
  containerProps?: StackProps;
}

export const PageTitle = ({ title, desc, children, containerProps, ...props }: PageTitleProps) => (
  <VStack w="full" alignItems="stretch" textAlign="center" mb={PADDING.DEFAULT} {...containerProps}>
    <Stack direction={{ base: "column", md: "row" }} justifyContent="center" alignItems="center">
      <Center>
        <Box h="32" p="4" bg="blue.700" rounded="md">
          <Center bg="yellow.400" w="full" h="full" py="4" px="8" borderRadius="50%">
            <Heading
              as="h1"
              fontWeight="extrabold"
              textTransform="uppercase"
              letterSpacing="tighter"
              color="blue.700"
              fontSize={{ base: "2xl", md: "4xl" }}
              {...props}
            >
              {title}
            </Heading>
          </Center>
        </Box>
      </Center>
    </Stack>

    {children}

    {!!desc && (
      <Text fontSize={{ base: "sm", md: "md" }} px="12" color="gray.600">
        {desc}
      </Text>
    )}
  </VStack>
);

export const PageTitleSkeleton = ({ withDesc = false }: { withDesc?: boolean }) => (
  <VStack w="full" alignItems="center" textAlign="center" mb={PADDING.DEFAULT}>
    <Box w="64" h="32" p="4" bg="blue.700" rounded="md">
      <Center bg="yellow.400" w="full" h="full" py="4" px="8" borderRadius="50%"></Center>
    </Box>

    {withDesc && (
      <Text fontSize={{ base: "sm", md: "md" }} color="gray.600">
        ________ ________ ________
      </Text>
    )}
  </VStack>
);
