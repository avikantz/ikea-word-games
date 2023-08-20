"use client";

import React, { ReactNode } from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardProps,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";

import { IKEAProduct } from "@/interfaces";
import { replaceWithQuestionMarks } from "@/utils/words";

interface IKEAProductProps extends CardProps {
  product: IKEAProduct;
  showName?: boolean;
  showImage?: boolean;
  showDesc?: boolean;
  isSuccess?: boolean;
  isFailure?: boolean;
  children?: ReactNode;
}

export const IKEAProductCard = ({
  product,
  showName,
  showImage,
  showDesc,
  isSuccess,
  isFailure,
  children,
  ...props
}: IKEAProductProps) => {
  return (
    <Card
      w={{ base: "full", md: "auto" }}
      direction="row"
      overflow="hidden"
      variant="outline"
      transition="all 0.2s ease"
      boxSizing="border-box"
      borderColor={isSuccess ? "green.500" : isFailure ? "red.500" : "gray.200"}
      boxShadow={isSuccess ? "green-xl" : isFailure ? "red-xl" : "none"}
      {...props}
    >
      <Box
        w={{ base: "120px", md: "200px" }}
        h={{ base: "120px", md: "200px" }}
        overflow="hidden"
      >
        <Image
          src={product.image}
          alt={product.alt}
          w="full"
          h="full"
          filter={showImage ? undefined : "blur(20px)"}
          objectFit="cover"
          pointerEvents="none"
        />
      </Box>
      <Stack flexGrow={1} minW={{ md: "300px" }} gap="0">
        <CardBody p={{ base: 2, md: 4 }} gap={{ base: 1, md: 2 }}>
          <Heading size="md">
            {showName ? product.name : replaceWithQuestionMarks(product.name)}
          </Heading>

          <Text color="gray.500">
            {showDesc ? product.desc : replaceWithQuestionMarks(product.desc)}
          </Text>
        </CardBody>

        <CardFooter p={{ base: 2, md: 4 }}>
          {showName ? (
            <Button
              as="a"
              href={product.url}
              target="_blank"
              variant={{ base: "link", md: "solid" }}
              colorScheme="blue"
            >
              View Product
            </Button>
          ) : (
            children
          )}
        </CardFooter>
      </Stack>
    </Card>
  );
};
