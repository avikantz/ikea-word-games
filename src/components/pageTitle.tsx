import React, { ReactNode } from "react";
import { Heading, HeadingProps, Stack, StackProps, Text, VStack } from "@chakra-ui/react";
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
      {children}
      <Heading fontSize={{ base: "2xl", md: "4xl" }} {...props}>
        {title}
      </Heading>
    </Stack>

    {!!desc && (
      <Text fontSize={{ base: "sm", md: "md" }} color="gray.500">
        {desc}
      </Text>
    )}
  </VStack>
);

export const PageTitleSkeleton = ({ withDesc = false }: { withDesc?: boolean }) => (
  <VStack w="full" alignItems="center" textAlign="center" mb={PADDING.DEFAULT}>
    <Heading fontSize={{ base: "2xl", md: "4xl" }}>☐☐☐☐☐☐</Heading>

    <Text fontSize={{ base: "sm", md: "md" }} color="gray.500">
      ☐☐☐☐☐☐
    </Text>
  </VStack>
);
