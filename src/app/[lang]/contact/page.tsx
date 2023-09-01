"use client";

import { Box, Container, Heading, Link, Text, VStack } from "@chakra-ui/react";

import { useTranslation } from "@/app/i18n/client";
import { PageProps } from "@/interfaces/page";
import { Trans } from "react-i18next";
import { PATH_AVIKANTZ, PATH_IKEA_NAGASANDRA, PATH_RITVISHREE } from "@/utils/paths";

export default function Contact({ params: { lang } }: PageProps) {
  const { t } = useTranslation(lang);

  return (
    <main>
      <Box minH="100vh">
        <Container py={{ base: 4, md: 12 }} h="full" maxW="container.sm">
          <Heading textAlign="center" mb={{ base: 8, md: 16 }}>
            {t("contact")}
          </Heading>

          <VStack w="full" alignItems="center" spacing="8" textAlign="center" color="gray.500" fontWeight="medium">
            <Text>
              <Trans
                i18nKey="contact:about.1"
                components={{
                  a: <Link href={PATH_AVIKANTZ} target="_blank" rel="noopener" color="blue.500" />,
                }}
              />
            </Text>
            <Text>
              <Trans
                i18nKey="contact:about.2"
                components={{
                  a: <Link href={PATH_RITVISHREE} target="_blank" rel="noopener" color="blue.500" />,
                }}
              />
            </Text>
            <Text>
              <Trans
                i18nKey="contact:about.3"
                components={{
                  a: <Link href={PATH_IKEA_NAGASANDRA} target="_blank" rel="noopener" color="blue.500" />,
                }}
              />
            </Text>
          </VStack>
        </Container>
      </Box>
    </main>
  );
}
