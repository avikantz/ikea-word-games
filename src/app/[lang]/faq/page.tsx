"use client";

import { Box, Container, Divider, Heading, Link, Text, VStack } from "@chakra-ui/react";
import NextLink from "next/link";
import { Trans } from "react-i18next";

import { useTranslation } from "@/app/i18n/client";
import { PageProps } from "@/interfaces/page";
import { getLocalizedPath, PATH_CONTACT, PATH_EMAIL } from "@/utils/paths";

const FAQ_COUNT = 7;

export default function FAQ({ params: { lang } }: PageProps) {
  const { t } = useTranslation(lang);
  const { t: f } = useTranslation(lang, "faq");

  return (
    <main>
      <Box minH="100vh">
        <Container py={{ base: 4, md: 12 }} h="full" maxW="container.sm">
          <Heading textAlign="center" mb="8">
            {t("faq")}
          </Heading>

          <VStack w="full" alignItems="stretch" spacing="8" divider={<Divider />}>
            {Array(FAQ_COUNT)
              .fill(0)
              .map((_, i) => (
                <VStack key={i} textAlign="start" alignItems="stretch">
                  <Heading as="h3" fontSize="lg">
                    {f(`q.${i + 1}`)}
                  </Heading>
                  <Text color="gray.500">
                    <Trans
                      i18nKey={`faq:a.${i + 1}`}
                      components={{
                        contact: (
                          <Link
                            as={NextLink}
                            color="blue.500"
                            href={getLocalizedPath(PATH_CONTACT, lang)}
                            target="_blank"
                          />
                        ),
                        email: <Link color="blue.500" href={PATH_EMAIL} target="_blank" />,
                      }}
                    />
                  </Text>
                </VStack>
              ))}
          </VStack>
        </Container>
      </Box>
    </main>
  );
}