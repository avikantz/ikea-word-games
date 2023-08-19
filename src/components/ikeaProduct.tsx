"use client";

import React from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";

import { IKEAProduct } from "@/interfaces";
import { replaceWithQuestionMarks } from "@/utils/words";

interface IKEAProductProps {
  product: IKEAProduct;
  showName?: boolean;
  showImage?: boolean;
  showDesc?: boolean;
}

export const IKEAProductCard = ({
  product,
  showName,
  showImage,
  showDesc,
}: IKEAProductProps) => {
  return (
    <Card direction="row" overflow="hidden" variant="outline">
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
      <Stack minW={{ md: "300px" }}>
        <CardBody>
          <Heading size="md">
            {showName ? product.name : replaceWithQuestionMarks(product.name)}
          </Heading>

          <Text py="2" color="gray.500">
            {showDesc ? product.desc : replaceWithQuestionMarks(product.desc)}
          </Text>
        </CardBody>

        {showName && (
          <CardFooter>
            <Button
              as="a"
              href={product.url}
              target="_blank"
              variant="solid"
              colorScheme="blue"
            >
              View Product
            </Button>
          </CardFooter>
        )}
      </Stack>
    </Card>
  );
};
