"use client";

import { Box, Container, Divider, Heading, Link, Text, VStack } from "@chakra-ui/react";

import { useTranslation } from "@/app/i18n/client";
import { PageProps } from "@/interfaces/page";
import { Trans } from "react-i18next";
import { PATH_AVIKANTZ, PATH_IKEA_NAGASANDRA, PATH_RITVISHREE } from "@/utils/paths";
import { SocialShareButtons } from "@/components/socialShares";
import { BuyMeACoffeeButton } from "@/components/coffeeButton";

export default function About({ params: { lang } }: PageProps) {
  const { t } = useTranslation(lang);
  const { t: a } = useTranslation(lang, "about");

  return (
    <main>
      <Box>
        <Container py={{ base: 4, md: 12 }} h="full" maxW="container.sm">
          <Heading textAlign="center" mb={{ base: 8, md: 16 }}>
            {t("about")}
          </Heading>

          <VStack w="full" alignItems="center" spacing="8" textAlign="center" color="gray.500" fontWeight="medium">
            <Text>
              <Trans
                i18nKey="about:about.1"
                components={{
                  a: <Link href={PATH_AVIKANTZ} target="_blank" rel="noopener" color="blue.500" />,
                }}
              />
            </Text>
            <Text>
              <Trans
                i18nKey="about:about.2"
                components={{
                  a: <Link href={PATH_RITVISHREE} target="_blank" rel="noopener" color="blue.500" />,
                }}
              />
            </Text>
            <Text>
              <Trans
                i18nKey="about:about.3"
                components={{
                  a: <Link href={PATH_IKEA_NAGASANDRA} target="_blank" rel="noopener" color="blue.500" />,
                }}
              />
            </Text>

            <Divider />

            <Text textAlign="center" fontWeight="semibold">
              {t("share")}
            </Text>

            <SocialShareButtons bgColor="#FFFEFB" iconColor="#111111" />

            <BuyMeACoffeeButton />
          </VStack>
        </Container>
      </Box>
    </main>
  );
}
