"use client";

import { Box, Container, Divider, Heading, Link, List, ListItem, Text, VStack } from "@chakra-ui/react";

import { useTranslation } from "@/app/i18n/client";
import { PageProps } from "@/interfaces/page";
import { Trans } from "react-i18next";
import { PATH_AVIKANTZ, PATH_GITHUB, PATH_IKEA_NAGASANDRA, PATH_RITVISHREE } from "@/utils/paths";
import { SocialShareButtons } from "@/components/socialShares";
import { BuyMeACoffeeButton } from "@/components/coffeeButton";
import { PADDING } from "@/theme/index";
import { CONTRIBUTORS } from "./contributors";
import { OPEN_SOURCE_CREDITS } from "./credits";

export default function About({ params: { lang } }: PageProps) {
  const { t } = useTranslation(lang);

  return (
    <main>
      <Box>
        <Container py={{ base: 4, md: 12 }} h="full" maxW="container.sm">
          <Heading textAlign="center" mb={{ base: 8, md: 16 }}>
            {t("common.about")}
          </Heading>

          <VStack
            w="full"
            alignItems="center"
            spacing={PADDING.DEFAULT}
            textAlign="center"
            color="gray.600"
            fontWeight="medium"
          >
            <Text>
              <Trans
                i18nKey="about.1"
                components={{
                  a: <Link href={PATH_AVIKANTZ} target="_blank" rel="noopener" color="blue.500" />,
                }}
              />
            </Text>
            <Text>
              <Trans
                i18nKey="about.2"
                components={{
                  a: <Link href={PATH_RITVISHREE} target="_blank" rel="noopener" color="blue.500" />,
                }}
              />
            </Text>
            <Text>
              <Trans
                i18nKey="about.3"
                components={{
                  a: <Link href={PATH_IKEA_NAGASANDRA} target="_blank" rel="noopener" color="blue.500" />,
                }}
              />
            </Text>
            <Text>
              <Trans
                i18nKey="about.4"
                components={{
                  a: <Link href={PATH_GITHUB} target="_blank" rel="noopener" color="blue.500" />,
                }}
              />
            </Text>

            <Divider />

            <Text>{t("about.contributors")}</Text>

            <List spacing="2">
              {CONTRIBUTORS.map((contributor) => (
                <ListItem key={contributor.url}>
                  <Text>
                    {contributor.name}{" "}
                    <Link color="blue.500" href={contributor.url} rel="noopener" target="_blank">
                      @{contributor.username}
                    </Link>
                  </Text>
                </ListItem>
              ))}
            </List>

            <Divider />

            <Text>{t("about.credits")}</Text>

            <List spacing="2">
              {OPEN_SOURCE_CREDITS.map((credits) => (
                <ListItem key={credits.href}>
                  <Link color="blue.500" href={credits.href} rel="noopener" target="_blank">
                    {credits.title}
                  </Link>
                </ListItem>
              ))}
            </List>

            <Divider />

            <SocialShareButtons bgColor="#FFFEFB" iconColor="#111111" />

            <BuyMeACoffeeButton />
          </VStack>
        </Container>
      </Box>
    </main>
  );
}
