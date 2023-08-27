"use client";

import React, { ReactNode, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardProps,
  Center,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useAnimate } from "framer-motion";
import ConfettiExplosion from "react-confetti-explosion";

import { IKEAProduct } from "@/interfaces";
import { replaceWithQuestionMarks } from "@/utils/words";
import { useTranslation } from "@/app/i18n/client";

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
  const { t } = useTranslation();

  const [cardRef, animateCard] = useAnimate();

  // Jiggle card on failure
  useEffect(() => {
    if (isFailure) {
      animateCard(
        cardRef.current,
        {
          scale: [1, 1.1, 1, 1.1, 1],
          rotate: [0, 10, 0, -10, 0],
        },
        {
          duration: 0.1,
          repeat: 3,
        },
      );
    }
  }, [animateCard, cardRef, isFailure]);

  // Zoom card on success
  useEffect(() => {
    if (isSuccess) {
      animateCard(cardRef.current, { scale: [1, 1.2, 1] }, { duration: 0.1 });
    }
  }, [animateCard, cardRef, isSuccess]);

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
      ref={cardRef}
      position="relative"
      {...props}
    >
      {/* Success confetti */}
      {isSuccess && (
        <Center position="absolute" top="0" bottom="0" left="0" right="0">
          <ConfettiExplosion colors={["#FFDB00", "#008AFF", "#111111"]} height="80vh" />
        </Center>
      )}

      <Box w={{ base: "120px", md: "200px" }} h={{ base: "120px", md: "200px" }} overflow="hidden">
        <Image
          src={product.image}
          alt={product.desc}
          w="full"
          h="full"
          filter={showImage ? undefined : "blur(20px)"}
          objectFit="cover"
          pointerEvents="none"
        />
      </Box>
      <Stack flexGrow={1} minW={{ md: "300px" }} gap="0">
        <CardBody p={{ base: 2, md: 4 }} gap={{ base: 1, md: 2 }}>
          <Heading size="md">{showName ? product.name : replaceWithQuestionMarks(product.name)}</Heading>

          <Text color="gray.500">{showDesc ? product.desc : replaceWithQuestionMarks(product.desc)}</Text>
        </CardBody>

        <CardFooter p={{ base: 2, md: 4 }}>
          {showName ? (
            <Button as="a" size="sm" href={product.url} target="_blank" variant="link" colorScheme="blue">
              {t("view_product")}
            </Button>
          ) : (
            children
          )}
        </CardFooter>
      </Stack>
    </Card>
  );
};
